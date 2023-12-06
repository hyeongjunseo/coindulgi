import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Home from "./pages/Home";
import Trend from "./pages/Trend";
import Detail from "./pages/Detail";
import Event from "./pages/Event";
import News from "./pages/News";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trend" element={<Trend />} />
        <Route path="/coins/:id" element={<Detail />} />
        <Route path="/event" element={<Event />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
