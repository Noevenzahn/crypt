import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./components/Loader"

import "./App.css";


function App() {

  //Why do I have to set the inital value?!
  const [data, setData] = useState({ 
    time: {}, 
    bpi: {
      USD: {},
      GBP: {},
      EUR: {}

    } 
  });
  const [loading, setLoading] = useState(true)
  
  const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

  const fetchAdvice = (apiUrl) => {
    axios.get(apiUrl) 
    .then ((response) => {
      const advice = response.data; // .data is needed because of axios (https://axios-http.com/docs/res_schema)
            setData(advice); 
            setLoading(false);
    })
    .catch((error) => {
        console.error();
    })
}
  
  useEffect(() => {
    fetchAdvice(apiUrl);
  }, []);


  return loading ? (<Loader />) :
  (
    <>
      <h1>Hello!</h1>
      {loading ? <div>loading...</div> : <div>{data.bpi.USD.rate}</div>}
      {loading ? <div>loading...</div> : <div>{data.bpi.GBP.rate}</div>}
      {loading ? <div>loading...</div> : <div>{data.bpi.EUR.rate}</div>}
      {loading ? <div>loading...</div> : <div>{data.time.updated}</div>}
    </>
  )
}

export default App;