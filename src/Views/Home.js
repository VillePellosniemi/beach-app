import React, { useState } from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';
import { distanceCal} from '../Components/DistanceCal';
import { usePosition } from 'use-position';

function Home() {
    const url = 'https://iot.fvh.fi/opendata/uiras/uiras2_v1.json'
    let beaches = useAxiosGet(url)
    let newBeaches = [];
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
        content = Object.keys(beaches.dt).sort(function(a,b){
            return distanceCal(beaches.dt[a].meta.lat, beaches.dt[a].meta.lon, lat1, lon1) - distanceCal(beaches.dt[b].meta.lat, beaches.dt[b].meta.lon, lat1, lon1)
        }).map((beach, key) => {
            //get beach ID from API
            const id = Object.values(beach).join("")

            //get beach location and calculate the distance(d)
            const lat = beaches.dt[beach].meta.lat
            const long = beaches.dt[beach].meta.lon
            const d = distanceCal(lat, long, lat1, lon1)/1000


            return (
                    <div className = "block relative pb-5 px-5" key = {key}>
                        <Link to = {`/~lauriaus/build/${id}`}>
                            <img src={`images/${id}.jpg`} style = {{height:"135px"}} className="object-cover rounded-xl w-full" />
                            
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
            <div>
                <h1 className = "font-bold text-lg text-left pl-5">Beaches near you</h1>
                <div className="overflow-scroll w-full max-h-full pt-5"> {content} </div>
            </div>
    )
}

export default Home 
