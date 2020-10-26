import React from 'react';
import {useAxiosGet} from "../Hooks/HttpRequests";
import Loader from "../Components/Loader";
import {Link} from "react-router-dom";

class SearchForm extends React.Component {



    constructor(props){
        super(props);
        this.state = { beachName: '' };


    }

    handleChange = event => {
        this.setState({ beachName: event.target.value });

    };
    handleSubmit = event => {
        alert('A name was submitted: ' + this.state.beachName);
        event.preventDefault();
        /*
        let url = 'https://iot.fvh.fi/opendata/uiras/uiras2_v1.json'
        let beaches = useAxiosGet(url)
        let content = null






            if (beaches.loading) {
                content = <Loader/>
            }

            if (beaches.dt) {
                content = Object.keys(beaches.dt).map((beach, key) => {
                    //get beach ID from API
                    const id = Object.values(beach).join("")
                    console.log(beaches.dt[beach].meta.name)
                    return (

                        <h1 className="p-5" key={key}>
                            <Link to={`/${id}`}>
                                {beaches.dt[beach].meta.name}
                            </Link>
                        </h1>
                    )
                })
            }

            return (
                console.log('ss')
            )
*/
        };





    render() {
        return (
            <React.Fragment>
                <form className="m-1 text-center"  onSubmit={this.handleSubmit}>
                    <input
                        className="outline-black"
                        type="text"
                        name="beachName"
                        value={this.state.beachName}
                        onChange={this.handleChange}

                    />
                    <input className="m-1 text-center" type="submit" value="Submit" />
                </form>

            </React.Fragment>
        );


    }





}

export default SearchForm