import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader"
import List from "./components/List"
import "./App.css";
import Ethereum from "./graphics/Ethereum.svg";
import BitcoinCash from "./graphics/BitcoinCash.png";
import Bitcoin from "./graphics/Bitcoin.svg";
import Litecoin from "./graphics/Litecoin.png";
import Dogecoin from "./graphics/Dogecoin.png";


function App() {

  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if(list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return []
    }
  }

  const [data, setData] = useState({ 
    "currency": {
      "vs-currency": "",
      "change": "",
    } 
  });

  const [currency, setCurrency] = useState("ethereum");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(getLocalStorage()); 
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {id: new Date().getTime().toString(), currency, vsCurrency};
    setList([...list, newItem]);
  }

  // useEffect(()=> {
  //   setList([])
  // }, [])

  const handleLogo = currency => {
    switch(currency) {
      case "ethereum":
        return Ethereum;
      case "bitcoin":
        return Bitcoin;
      case "bitcoin-cash":
        return BitcoinCash;
        case "litecoin":
          return Litecoin;
          case "dogecoin":
            return Dogecoin;
      default: 
    }
  }
  const handleSymbol = vsCurrency => {
    switch(vsCurrency) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
        case "jpy":
          return "¥";
        case "btc":
          return "₿";
      default: 
    }
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <>
      <form className="field" onSubmit={handleSubmit}>
        {loading ? <Loader /> : data[currency] && 
        <div className="currency-container">
          <img alt="" src={handleLogo(currency)} />
          <div>
            <p className="currency-name">{Object.keys(data)[0]}</p>
            <p className="currency-price"> <span className="symbol">{handleSymbol(vsCurrency)}</span>{price}</p>
          </div>
        </div>
        }

        <p>currency</p>
        <div className="select-wrapper">
            <select id="currency" onChange={handleChangeCurrency}>
              <option value="ethereum">(ETH) Ethereum</option>
              <option value="bitcoin">(BTC) Bitcoin</option>
              <option value="litecoin">(LTC) Litecoin</option>
              <option value="bitcoin-cash">(BCH) Bitcoin Cash</option>
              <option value="dogecoin">(DOGE) Dogecoin</option>
            </select> 
        </div>

        <p>comparison</p>
        <div className="select-wrapper last">
            <select id="comparison-currency" onChange={handleChangeVsCurrency}>
                <option value="usd">(USD) US-Dollar</option>
                <option value="eur">(EUR) Euro</option>
                <option value="gbp">(GBP) Great British Pound</option>
                <option value="jpy">(JPY) Japanese Yen</option>
                <option value="btc">(BTC) Bitcoin</option>
            </select> 
        </div>
        <button type="submit">+</button>
      </form>

      {list.length > 0 && (
        <div>
          <List list={list} setList={setList} />
        </div>
      )}
    </> 
  )
} 
export default App;