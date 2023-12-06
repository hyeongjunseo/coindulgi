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

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  const res = await axios.get(
    `https://newsapi.org/v2/everything?q=cryptocurrency&from=${formattedDate}&sortBy=popularity&apiKey=185b683ecedc46ea958c0b39242e7fb6`
  );
  console.log(res.data);
  return res.data.articles.map((article) => ({
    title: article.title,
    url: article.url,
    image: article.urlToImage,
  }));
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

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

//configure and export the store
export default configureStore({
  reducer: {
    coins: coinSlice.reducer,
    details: detailSlice.reducer,
    news: newsSlice.reducer,
  },
});
