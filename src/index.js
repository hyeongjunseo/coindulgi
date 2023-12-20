import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Home from "./components/Home/Home";
import Trend from "./components/Trend/Trend";
import Detail from "./components/Trend/Detail/Detail";
import Event from "./components/Event/Event";
import News from "./pages/News";
import Risk from "./pages/Risk";

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
        <Route path="/risk" element={<Risk />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
