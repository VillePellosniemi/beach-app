import React from 'react';
import HomeSearch from '../Views/HomeSearch'


class SearchBeach extends React.Component {
     constructor(props){
        super(props);
        this.state = {
            beachName: this.props.beachName,
        };
    }


    render(){
        const {beachName} = this.state;
        console.log({beachName})
      console.log(this.state.beachName + 'dddd')
        return(

           <HomeSearch beachName={this.state.beachName}/>


        )
    }
}

export default SearchBeach