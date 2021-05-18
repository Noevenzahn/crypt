import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./components/Loader"

import "./App.css";


function App() {

  //Why do I have to set the inital value?!
  const [data, setData] = useState({ 
    "currency": {
      "vs-currency": "",
      "change": "",
    } 
  });

  const [currency, setCurrency] = useState("ethereum");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  
  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_last_updated_at=true`;
  // id of coins, comma-separated if querying more than 1 coin!

  
  const fetchPrice = (apiUrl) => {
    axios.get(apiUrl) 
    .then ((response) => {
      const price = response.data; // .data is needed because of axios (https://axios-http.com/docs/res_schema)
            setData(price); 
            setLoading(false);
    })
    .catch((error) => {
        console.error();
    })
}
  
  useEffect(() => {
    fetchPrice(apiUrl);
  }, [currency, vsCurrency, apiUrl]);

  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value)
    setLoading(true)
  };
  const handleChangeVsCurrency = (e) => {
    setVsCurrency(e.target.value)
    setLoading(true)
  };

  return (
    <>
      <form>
        {loading ? <Loader /> : data[currency] && 
        <div>
          <p className="currency-name">{Object.keys(data)[0]}</p>
          <p className="currency-price"> <span className="symbol">$</span>{data[currency][vsCurrency]}</p>
          {/* <div>{data[currency][`${vsCurrency}_24h_change`].toFixed(2)}%</div> */}
        </div>
        }

        <p>currency</p>
        {/* <input list="currency" onChange={handleChangeCurrency} />
        <datalist id="currency">
          <option value="bitcoin" />
          <option value="ethereum" />
        </datalist>  */}

        <select id="currency" onChange={handleChangeCurrency}>
          {/* Mit Iterator alle verfügbaren Optionen auflisten? */}
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="litecoin">Litecoin</option>
          <option value="bitcoin-cash">Bitcoin Cash</option>
          <option value="cardano">Cardano</option>
          <option value="binancecoin">Binance Coin</option>
          <option value="dogecoin">Dogecoin</option>
          <option value="tether">Tether</option>
          <option value="stellar">Stellar</option>
          <option value="ripple">Ripple</option>
        </select> 

        <p>comparison</p>
        <input className="comparison-currency" value={vsCurrency} onChange={handleChangeVsCurrency} />
        <button>+</button>
      </form>
    </> // ggf. values mit iterator auf list api call um dynamische Verfügbarkeiten am start zu haben
  )
} 
//Richtiges onSubmit usw?
export default App;