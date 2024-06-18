import { createContext, useState } from "react";

export const FirebaseContext = createContext(null)
export const Context = createContext(null)

export default function authContext({children}){
    const [user, setUser] = useState(null)

    return(
        <Context.Provider value={{user,setUser}}>
            {children}
        </Context.Provider>
    )
}