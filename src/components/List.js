import React, { useState, useEffect } from "react";
import axios from "axios";

function List({ list }) {

    const [loading, setLoading] = useState(true);
    //   const [price, setPrice] = useState("");
    const [priceList, setPriceList] = useState([]);

    useEffect(() => {
        const fetch = async () => {

            const fetchedPrice = await Promise.all(list.map(async ({ id, currency, vsCurrency }) => {
                const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_last_updated_at=true`;

                let response = await axios.get(apiUrl);
                let { data } = response;
                let price = await data[currency][vsCurrency];
                console.log(price);

                return { id, currency, vsCurrency, price };
            }));

            setPriceList(fetchedPrice);
        }
        fetch();
    }, [list]);





    return (
        <>
        {
            priceList.map(({ id, currency, vsCurrency, price }) => {
                return (
                    <div key={id} className="field">
                        <p className="currency-name">{currency} {vsCurrency}</p>
                        <p className="currency-price"><span className="symbol">$</span>{price}</p>
                        {console.log(price)}
                    </div>
                )
            })
        }
        </>
    )
}

export default List;