import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function NavigationMenu(props) {
    return (
        <div>
            <div>
                <Link to = "/" className = "font-bold block text-center py-20" onClick={props.closeMenu}>Logo</Link>
            </div>

            <ul>
                <li><Link to = "/favorites" className = "text-blue-500 py-5 border-b block text-center" onClick={props.closeMenu}>Favorite Beaches</Link></li>
                <li><Link to = "/promodiscount" className = "text-blue-500 py-5 border-b block text-center" onClick={props.closeMenu}>Promo &amp; discount</Link></li>
                <li><Link to = "/setting" className = "text-blue-500 py-5 border-b block text-center" onClick={props.closeMenu}>Setting</Link></li>
            </ul>
        </div>
    );
}

export default NavigationMenu