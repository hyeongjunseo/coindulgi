import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching coins
export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/search/trending"
  );
  console.log(res.data);
  return res.data.coins.map((coin) => ({
    id: coin.item.id,
    image: coin.item.large,
    name: coin.item.name,
    price_btc: coin.item.price_btc,
  }));
});

export const fetchChartData = createAsyncThunk(
  "detail/fetchChartData",
  async (id) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`
    );
    console.log(res.data);
    return res.data.prices.map((p) => ({
      timestamp: new Date(p[0]).toLocaleDateString("en-US"),
      price: p[1],
    }));
  }
);

//slice for managing coins state
const coinSlice = createSlice({
  name: "coins",
  initialState: {
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

const detailSlice = createSlice({
  name: "details",
  initialState: {
    chartData: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      state.chartData = action.payload;
    });
    builder.addCase(fetchChartData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

//configure and export the store
export default configureStore({
  reducer: {
    coins: coinSlice.reducer,
    details: detailSlice.reducer,
  },
});
