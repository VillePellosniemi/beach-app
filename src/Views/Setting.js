import React from 'react';
import '../index.css'

function Setting() {
    return(
        <div>
            <h1 className = "font-bold text-2xl text-center mb-5">Setting</h1> 

            <ul>
                <li className = "flex py-5 border-b block text-left mx-5">
                    <h1 className = "flex-1">Language</h1>
                    <select id="languages" className="flex-2 rounded-lg p-1">
                        <option value="eng" selected>English</option>
                        <option value="fin">Suomi</option>
                        <option value="sve" >Svenska</option>
                    </select>
                </li>
                <li className = "flex py-5 border-b block text-left mx-5">
                    <h1 className = "flex-1">Dark mode</h1>
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                    </label>
                </li>
            </ul>
        </div>
    )
}

export default Setting 