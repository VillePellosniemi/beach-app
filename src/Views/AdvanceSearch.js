import React from 'react';
import SearchForm from "./SearchForm";

function AdvanceSearch() {

    return(
        <div>
            {/*<h1 onClick={props.closeMenu}>Click to close</h1>*/}
            <div className = "h-full mt-5">
            <SearchForm/>
            </div>
        </div>
    )
}


export default AdvanceSearch

