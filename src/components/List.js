import React, { useState, useEffect } from "react";
import axios from "axios";
import Ethereum from "../graphics/Ethereum.svg";
import BitcoinCash from "../graphics/BitcoinCash.png";
import Bitcoin from "../graphics/Bitcoin.svg";
import Litecoin from "../graphics/Litecoin.png";
import Dogecoin from "../graphics/Dogecoin.png";

function List({ list, setList }) {

    const [priceList, setPriceList] = useState([]);

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
        const fetch = async () => {

            const fetchedPrice = await Promise.all(list.map(async ({ id, currency, vsCurrency }) => {
                const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_last_updated_at=true`;

                let response = await axios.get(apiUrl);
                let { data } = response;
                let price = await data[currency][vsCurrency];
                const roundOne = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
                price = roundOne(price, 6);
                let change = await data[currency][`${vsCurrency}_24h_change`].toFixed(2);
                
                return { id, currency, vsCurrency, price, change };
            }));

            setPriceList(fetchedPrice);
        }
        fetch();
    }, [list]);

    return (
        <>
        {
            priceList.map(({ id, currency, vsCurrency, price, change }) => {
                return (
                    <div key={id} className={change >= 0 ? "field field-positive" : "field field-negative"}>
                            <div className="currency-container">
                            <img alt="" src={handleLogo(currency)} />
                            <div>
                            <p className="currency-name">{currency}</p>
                            <p className="currency-price"><span className="symbol">{handleSymbol(vsCurrency)}</span>{price}</p>
                            </div>
                            <div className={ change >= 0 ? "change positive":"change negative"}>
                              <p>{change}%</p>
                            </div>
                            {/* <button type="button" onClick={()=> setList(list.filter((item) => item.id !== id))}>-</button> */}
                        </div>
                    </div> 
                )
            })
        }
        </>
    )
}

export default List;