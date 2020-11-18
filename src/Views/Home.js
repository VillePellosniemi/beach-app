import React, { useState } from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';
import { distanceCal} from '../Components/DistanceCal';
import { usePosition } from 'use-position';

function Home() {
    const url = 'https://iot.fvh.fi/opendata/uiras/uiras2_v1.json'
    let beaches = useAxiosGet(url)
    let content = null
    //Get user current location
    const watch = true;
    const {latitude,longitude} = usePosition(watch);
    const lat1 = latitude
    const lon1 = longitude

    if(beaches.loading) {
        content = <Loader />
    }

    if(beaches.dt) {
        content = Object.keys(beaches.dt).map((beach, key) => {
            //get beach ID from API
            const id = Object.values(beach).join("")

            //get beach location and calculate the distance(d)
            const lat = beaches.dt[beach].meta.lat
            const long = beaches.dt[beach].meta.lon
            const d = distanceCal(lat, long, lat1, lon1)/1000

            return (
                    <div className = "block relative pb-5 px-5" key = {key}>
                        <Link to = {`/${id}`}>
                            <img src={`images/${id}.jpg`} className="object-cover rounded-xl h-40 w-full" />
                            
                            <div className="w-full text-white font-medium absolute bottom-0 left-3 pl-5">
                                <h1 className="w-2/3 truncate text-2xl">{beaches.dt[beach].meta.name}</h1>
                                <h1 className="text-base italic pb-8">{(Math.round(d*10)/10)} km away</h1>
                            </div>
                        </Link>
                    </div>
            )
        })
    }

    return (
            <div className="overflow-scroll w-full max-h-screen pt-5"> {content} </div>
    )
}

export default Home 
