import React from "react";

function List({ list }) {
    return (
        <> 
            {list.map((item) => {
                const {id, currency, vsCurrency, price} = item;

                return (
                    <div key={id} className="field">
                        <p className="currency-name">{currency} {vsCurrency}</p>
                        <p className="currency-price"><span className="symbol">$</span>{price}</p> 
                    </div>
                )          
            })}
        </>
    )
}

export default List;