import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCoins } from "../store";

export default function Trend() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return <div>Trend</div>;
}
