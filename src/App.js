import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./components/Loader"
import CurrencyField from "./components/CurrencyField"
import List from "./components/List"

import "./App.css";


function App() {

  const [data, setData] = useState({ 
    "currency": {
      "vs-currency": "",
      "change": "",
    } 
  });

  const [currency, setCurrency] = useState("ethereum");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [list, setList] = useState([]);
  const [price, setPrice] = useState("");
  
  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_last_updated_at=true`;
  // id of coins, comma-separated if querying more than 1 coin!

  
  const fetchPrice = (apiUrl) => {
    axios.get(apiUrl) 
    .then ((response) => {
      const data = response.data; // .data is needed because of axios (https://axios-http.com/docs/res_schema)
            setData(data); 
            setLoading(false);
            setPrice(data[currency][vsCurrency]);
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

  const addField = () => {
    setAdd(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {id: new Date().getTime().toString(), currency, vsCurrency, price: price,};
    setList([...list, newItem]);
  }

  console.log(list);

  return (
    <>
      <form className="field" onSubmit={handleSubmit}>
        {loading ? <Loader /> : data[currency] && 
        <div>
          <p className="currency-name">{Object.keys(data)[0]}</p>
          <p className="currency-price"> <span className="symbol">$</span>{price}</p>
          {/* Symbol dynamisch ändern */}
        </div>
        }

        <p>currency</p>
        <div className="select-wrapper">
            <select id="currency" onChange={handleChangeCurrency}>
              {/* Mit Iterator alle verfügbaren Optionen auflisten? */}
              <option value="ethereum">(ETH) Ethereum</option>
              <option value="bitcoin">(BTC) Bitcoin</option>
              <option value="litecoin">(LTC) Litecoin</option>
              <option value="bitcoin-cash">(BCH) Bitcoin Cash</option>
              <option value="cardano">(ADA) Cardano</option>
              <option value="binancecoin">(BNB) Binance Coin</option>
              <option value="dogecoin">(DOGE) Dogecoin</option>
              <option value="tether">(USDT) Tether</option>
              <option value="stellar">(XLM) Stellar</option>
              <option value="ripple">(XRP) Ripple</option>
            </select> 
        </div>

        <p>comparison</p>
        <div className="select-wrapper last">
            <select id="comparison-currency" onChange={handleChangeVsCurrency}>
                {/* Mit Iterator alle verfügbaren Optionen auflisten? */}
                <option value="usd">(USD) US-Dollar</option>
                <option value="eur">(EUR) Euro</option>
                <option value="btc">(BTC) Bitcoin</option>
                <option value="pln">(PLN) Złoty</option>
                <option value="aud">(AUD) Australian Dollar</option>
                <option value="gbp">(GBP) Great British Pound</option>
                <option value="jpy">(JPY) Japanese Yen</option>
            </select> 
        </div>
        <button type="submit">+</button>
      </form>

      {list.length > 0 && (
        <div>
          <List list={list} />
        </div>
      )}
    </> // ggf. values mit iterator auf list api call um dynamische Verfügbarkeiten am start zu haben
  )
} 
export default App;