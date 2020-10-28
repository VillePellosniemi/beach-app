import React from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';
import Home from '../Views/Home'

class SearchBeach extends React.Component {
 /* Home() {
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

            <h1 className = "p-5" key = {key}>
              <Link to = {`/${id}`}>
                {beaches.dt[beach].meta.name}
              </Link>
            </h1>
        )
      })
    }

    return (
        <div> {content} </div>
    )
  }
*/

     constructor(props){

        super(props);
        this.state = {
            beachName: this.props.beachName,
        };
    }


    render(){
        const {beachName} = this.state;
        console.log({beachName})
        return(

            <Home  />


        )
    }
}



export default SearchBeach