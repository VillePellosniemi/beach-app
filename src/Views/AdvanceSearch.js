import React, {useState} from 'react';
import SearchForm from "./SearchForm";

function AdvanceSearch(props) {

    return(
        <div>
            <h1 className ="top-0 right-0 text-xl font-bold" onClick={props.closeMenu}>x</h1>
            <div className = "h-full ">
                <SearchForm closeMenu = {props.closeMenu} />
            </div>
        </div>
    )
}


export default AdvanceSearch

