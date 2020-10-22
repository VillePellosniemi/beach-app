import React from 'react';
import Loader from '../Components/Loader'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment'
import { useAxiosGet } from '../Hooks/HttpRequests';

function SinglePage() {
    const {name} = useParams();
    const url = "https://iot.fvh.fi/opendata/uiras/uiras2_v1.json"
    let beach = useAxiosGet(url)
    let content = null

    if(beach.loading) {
        content = <Loader />
    }
    /*
    
    */ 
    if(beach.dt) {
            //time since the sensors last updated
            const time = moment(beach.dt[name].data.slice(-1)[0].time).fromNow()
            
            return (
                <div>
                <p className = "p-5"> 
                    Name: {beach.dt[name].meta.name} <br/><br/>
                    Location: {beach.dt[name].meta.lat}, {beach.dt[name].meta.lon} <br/><br/>
                    Water temp: {beach.dt[name].data.slice(-1)[0].temp_water}°C <br/><br/>
                    Air temp: {beach.dt[name].data.slice(-1)[0].temp_air}°C <br/><br/>
                    Last updated: {time}
                </p>

                <div className = "flex items-center justify-center">
                    <Link to={`/${name}/map`} className = "bg-blue-500 text-white p-2 flex justify-center w-1/2">
                        Map
                    </Link>
                </div>
                </div>
            ) 
    }

    return (
        <div> {content} </div>
    )
}

export default SinglePage 