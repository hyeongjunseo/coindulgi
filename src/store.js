import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStats = createAsyncThunk("stats/fetchStats", async () => {
  const res = await axios.get("https://api.coingecko.com/api/v3/global");
  console.log(res);
  const {
    active_cryptocurrencies,
    markets,
    total_market_cap,
    market_cap_change_percentage_24h_usd,
    total_volume,
    market_cap_percentage,
  } = res.data.data;
  return {
    coins: active_cryptocurrencies,
    exchanges: markets,
    marketCap: total_market_cap.usd,
    marketCap_percentage: market_cap_change_percentage_24h_usd.toFixed(1),
    volume: total_volume.usd,
    dominance_btc: market_cap_percentage.btc.toFixed(1),
    dominance_eth: market_cap_percentage.eth.toFixed(1),
  };
});

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/search/trending"
  );
  const usdRes = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );
  console.log(res.data);
  console.log(usdRes.data.bitcoin.usd);
  return res.data.coins.map((coin) => ({
    id: coin.item.id,
    name: coin.item.name,
    price_btc: coin.item.price_btc.toFixed(10),
    price_usd: (coin.item.price_btc * usdRes.data.bitcoin.usd).toFixed(6),
    image: coin.item.large,
  }));
});

export const searchCoins = createAsyncThunk(
  "coins/searchCoins",
  async (query) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );
    return res.data.coins.map((coin) => ({
      id: coin.id,
      name: coin.name,
      image: coin.thumb,
    }));
  }
);

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
  yesterday.setDate(yesterday.getDate() - 2);

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
    description: article.description,
    url: article.url,
    image: article.urlToImage,
  }));
});

const statSlice = createSlice({
  name: "stats",
  initialState: {
    data: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchStats.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

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

const searchCoinSlice = createSlice({
  name: "searchCoins",
  initialState: {
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchCoins.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(searchCoins.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(searchCoins.rejected, (state, action) => {
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

export default configureStore({
  reducer: {
    stats: statSlice.reducer,
    coins: coinSlice.reducer,
    searchCoins: searchCoinSlice.reducer,
    details: detailSlice.reducer,
    news: newsSlice.reducer,
  },
});
