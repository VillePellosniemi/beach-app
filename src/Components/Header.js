import React from 'react';
import Navigation from './Navigation/Navigation';
import Search from './Search';

function Header() {
    return (
        <header className="flex justify-center items-center border-b p-3">
            <div className = "flex-1"><Navigation /></div>
            
            <span className="flex-1 text-center font-bold">
                City Swimmer
            </span>

            <div className = "flex-1 text-right"><Search /></div>
        </header>
    );
}

export default Header