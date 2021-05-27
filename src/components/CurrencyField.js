import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";

function CurrencyField(props) {

    const [data, setData] = useState({ 
        "currency": {
          "vs-currency": "",
          "change": "",
        } 
      });

    const [loading, setLoading] = useState(true);

    const [newField, setNewField] = useState([]);
      
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${props.currency}&vs_currencies=${props.vsCurrency}&include_24hr_change=true&include_last_updated_at=true`;
    
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
      }, [props.currency, props.vsCurrency, apiUrl]);

    useEffect(() => {
            const fields = [];
            fields.push({currency: props.currency, 
                        price: data[props.currency] ? data[props.currency][props.vsCurrency] : ""});
            setNewField([...newField, fields]);
    }, [data, props, newField])

    return (
        <>
            <div className="field">
            {loading ? <Loader /> : data[props.currency] &&
                <>
                    <p className="currency-name">{newField[0].currency}</p>
                    <p className="currency-price"> <span className="symbol">$</span>{newField[0].price}</p> 
                </>
            }
            </div>
        </>
    )
}

export default CurrencyField;