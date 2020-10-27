import React from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';

class SearchBeach extends React.Component {
     constructor(props){
         console.log(props)
        super(props);
        this.state = {
            beachName: this.props.beachName,
        };
    }

    render(){
        const {beachName} = this.state;
        return(
            <React.Fragment>
                {beachName}
            </React.Fragment>

        )
    }
}


export default SearchBeach