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
      image: coin.large,
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
    return res.data.prices.map((p) => {
      const date = new Date(p[0]);
      const formattedDate = `${String(date.getFullYear()).substr(2)}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      return {
        timestamp: formattedDate,
        price: p[1],
      };
    });
  }
);

export const fetchNews = createAsyncThunk(
  "news/fetchNews",

  async (keyword = "All Coins") => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 2);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const query = keyword === "All Coins" ? "cryptocurrency" : keyword;
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&pageSize=20&language=en&from=${formattedDate}&to=${formattedDate}&sortBy=popularity&apiKey=185b683ecedc46ea958c0b39242e7fb6`
    );
    console.log(res.data);

    // Filter articles to include only those with images
    const articlesWithImages = res.data.articles.filter(
      (article) => article.urlToImage
    );

    return articlesWithImages.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
    }));
  }
);

const statSlice = createSlice({
  name: "stats",
  initialState: {
    data: {},
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchStats.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true; // Flag to indicate error
    });
  },
});

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    data: [],
    error: null,
    isCoinsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state, action) => {
      state.error = null;
      state.isCoinsLoading = true;
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isCoinsLoading = false;
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.error = action.error.message;
      state.isCoinsLoading = true;
    });
  },
});

const searchCoinSlice = createSlice({
  name: "searchCoins",
  initialState: {
    data: [],
    error: null,
    isSearchLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchCoins.pending, (state, action) => {
      state.error = null;
      state.isSearchLoading = true;
    });
    builder.addCase(searchCoins.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isSearchLoading = false;
    });
    builder.addCase(searchCoins.rejected, (state, action) => {
      state.error = action.error.message;
      state.isSearchLoading = false;
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
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
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
