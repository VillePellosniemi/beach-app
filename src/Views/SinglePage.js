import React from 'react';
import Loader from '../Components/Loader'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment'
import { useAxiosGet } from '../Hooks/HttpRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faMap, faGlobeEurope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
            const url = beach.dt[name].meta.servicemap_url
            const web = beach.dt[name].meta.site_url

            return (
                <div className="bg-gray-100">
                    <img src={`images/${name}.jpg`} className="relative object-cover h-60 w-full" />

                    <div className="absolute w-full -mt-20 rounded-t-3xl bg-white py-8">
                        <h1 className="text-center font-bold text-xl">{beach.dt[name].meta.name} </h1>

                        <div className="flex items-center p-3">
                            <span className="flex-1 text-center text-green-500 text-xl">
                                <FontAwesomeIcon icon = {faThumbsUp}/>
                                <h1 className="text-base">50</h1>
                            </span>
                            
                            <span className="flex-1 text-center text-red-500 text-xl">
                                <FontAwesomeIcon icon = {faHeart}/>
                                <h1 className="text-base">favorited</h1>
                            </span>

                            <span className="flex-1 text-center text-blue-500 text-xl">
                                <Link to={`/${name}/map`}>
                                    <FontAwesomeIcon icon = {faMap}/>
                                    <h1 className="text-base">map</h1>
                                </Link>
                            </span>
                        </div>

                        <div className = "flex content-center text-xl pb-2 px-2 "> 
                            <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                                <h1>Water temp</h1>
                                <h1 className="text-4xl">{Math.round(beach.dt[name].data.slice(-1)[0].temp_water*10)/10}°C </h1>
                            </div>

                            <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                                <h1>Air temp</h1>
                                <h1 className="text-4xl">{Math.round(beach.dt[name].data.slice(-1)[0].temp_air*10)/10}°C </h1>
                            </div>
                        </div>
                        
                        <div className = "flex content-center text-xl pb-2 px-2"> 
                            <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                                <h1>Services</h1>
                                <h1 className="text-4xl"><a href={`${url}?p=1&t=accessibilityDetails`}><FontAwesomeIcon icon = {faInfoCircle}/></a></h1>
                            </div>
                        
                            <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                                <h1>Website</h1>
                                <h1 className="text-4xl"><a href={`${web}`}><FontAwesomeIcon icon = {faGlobeEurope}/></a></h1>
                            </div>
                        </div>

                        <div className="absolute w-full bottom-0 left-0 mb-3 text-center text-gray-600 italic">
                            <h1>Last updated: {time}</h1>
                        </div>
                    </div>                                                              
                </div>
            ) 
    }

    return (
        <div> {content} </div>
    )
}

export default SinglePage 