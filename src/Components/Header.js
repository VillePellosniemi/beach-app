import React from 'react';
import Navigation from './Navigation/Navigation';
import Search from './Search';

function Header() {
    
    return (
        <header className="flex justify-center items-center p-3">
            <div className = "flex-1"><Navigation /></div>
            
            <span className="flex-1 items-center" onClick={ refreshPage }>
                <img src="logo.png" className="object-cover h-auto w-auto ml-auto mr-auto" />
            </span>

            <div className = "flex-1 text-right"><Search /></div>
        </header>
    );
}

function refreshPage(){
    window.location.assign("http://users.metropolia.fi/~lauriaus/build/")
}

export default Header