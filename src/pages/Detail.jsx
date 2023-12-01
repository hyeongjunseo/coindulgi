import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { chartData } from "../store";

export default function Show() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(chartData(id));
  }, [dispatch]);

  return (
    <div>
      <Header />
    </div>
  );
}
