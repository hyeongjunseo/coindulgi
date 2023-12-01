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

export const chartData = createAsyncThunk("detail/chartData", async (id) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`
  );
  console.log(res.data);
});

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
    builder.addCase(chartData.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(chartData.fulfilled, (state, action) => {
      state.chartData = action.payload;
    });
    builder.addCase(chartData.rejected, (state, action) => {
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
