import React from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';



const HomeSearch = (props) => {



    const url = 'https://iot.fvh.fi/opendata/uiras/uiras2_v1.json'
    let beaches = useAxiosGet(url)
    let content = null

    if (beaches.loading) {
      content = <Loader/>
    }

    if (beaches.dt) {
      content = Object.keys(beaches.dt).map((beach, key) => {
        //logs search plus one api outcomeee
        // console.log( props.beachName + beaches.dt[beach].meta.name)
        //get beach ID from API
        const id = Object.values(beach).join("")
        if(props.beachName == beaches.dt[beach].meta.name){
          return (

              <h1 className="p-5" key={key}>
                <Link to={`/${id}`}>
                  {beaches.dt[beach].meta.name}
                </Link>
              </h1>
          )

        }
        return(
           null
        )
      })
    }

    return (
        <div className="overflow-scroll max-h-screen"> {content} </div>
    )
  }


export default HomeSearch