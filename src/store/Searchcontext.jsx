import React,{Children, createContext, useState} from "react";

export const SearchContext = createContext(null)

function SearchCon({children}){
  const [searchValue,setSearchValue] =  useState('')
  return (
    <SearchContext.Provider value={{searchValue,setSearchValue}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchCon