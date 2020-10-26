import React from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';

class SearchBeach extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            beachName: this.props.beachNames,
        };
    }

    render(){
        alert('d');
        const {beachName} = this.state;
        return(
            <React.Fragment>
                {beachName}
            </React.Fragment>
        )
    }
}


export default SearchBeach