import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AdvanceSearch from '../Views/AdvanceSearch';
import {useTransition, animated} from 'react-spring'

function Search() {
    const [showSearch, setShowSearch] = useState(false)
    const centered = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    }
    const transitions = useTransition(showSearch, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 }
        })
    
    
    return (
        <div>
            <span className="text-center text-xl font-bold p-3">
                <FontAwesomeIcon
                    icon = {faSearch}
                    onClick = {() => setShowSearch(!showSearch)}
                />
            </span>

            {
                transitions.map(({ item, key, props }) =>
                item && 
                <animated.div 
                    key={key} 
                    style={props}
                    className = "bg-black-t-50 fixed top-0 left-0 w-full h-full z-50" 
                    onClick = {() => setShowSearch(false)}
                >
                </animated.div>
                )
            }

            {
                transitions.map(({ item, key, props }) =>
                item && 
                <animated.div 
                    key={key} 
                    style={props}
                    style={centered}
                    className = "w-4/5 items-center bg-white rounded-xl pb-10 shadow z-50 px-3"
                >
                    <AdvanceSearch closeMenu = {() => setShowSearch(false)}/>
                </animated.div>
                )
            }
            
        </div>
    );
}

export default Search