import React,{ createContext, useState} from "react";

export const productContext = createContext(null)

function Product({children}) {
    const [productDetails, setProductDetails] = useState(null)

    return (
        <productContext.Provider value={{productDetails,setProductDetails}}>
            {children}
        </productContext.Provider>
    )
}

export default Product