import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function NavigationMenu(props) {

    return (
        <div>
            <div>
                <Link to = "/" className = "font-bold block py-20" onClick={props.closeMenu}>
                    <img src="../logo.png" className="block object-cover h-full w-2/3 ml-auto mr-auto" />
                </Link>
            </div>

            <ul>
                <li><Link to = "/favorites" className = "py-5 border-b block text-center" onClick={props.closeMenu}>Favorite Beaches</Link></li>
                <li><Link to = "/promodiscount" className = "py-5 border-b block text-center" onClick={props.closeMenu}>Promo &amp; discount</Link></li>
                <li><Link to = "/setting" className = "py-5 border-b block text-center" onClick={props.closeMenu}>Setting</Link></li>
            </ul>
        </div>
    );
}

export default NavigationMenu