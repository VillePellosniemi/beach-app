import React from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';

function Home() {
    const url = 'https://iot.fvh.fi/opendata/uiras/uiras2_v1.json'
    let beaches = useAxiosGet(url)
    let content = null

    if(beaches.loading) {
        content = <Loader />
    }

    if(beaches.dt) {
        content = Object.keys(beaches.dt).map((beach, key) => {
            //get beach ID from API
            const id = Object.values(beach).join("")

            return (

                <div className = "block relative pt-4 px-5" key = {key}> 
                    <Link to = {`/${id}`}>
                        <img src={`images/${id}.jpg`} className="object-cover rounded-xl h-40 w-full" />
                        <div className="w-2/3 truncate text-white text-xl font-medium absolute bottom-0 left-3 pl-3 pb-3">{beaches.dt[beach].meta.name} </div>
                    </Link>
                </div>
            )
        })
    }

    return (
        <div  className="overflow-scroll w-full max-h-screen pb-5"> {content} </div>
    )
}

export default Home 