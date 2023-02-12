import React from "react";
import searchImg from "../../img/search-normal.png";
import './Search.css'


export const Search = ({searchValue, search}) => {
    return(
        <div className="input_search">
            <img src={searchImg} alt="logo"/>
            <input value={search} onChange={e => searchValue(e.target.value)} type="search" placeholder="Search task..."/>
        </div>
    )
}
