import React from 'react';
import HomeSearch from "./HomeSearch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


class SearchForm extends React.Component {
   state = {
            beachName: '',
            submitted: false
    };

    handleChange = event => {
        this.setState({
            beachName: event.target.value
        });
    };

    handleSubmit = event =>{
        event.preventDefault();
        this.setState({
            submitted: true,
            beachName: this.state.beachName
        })
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="text-center text-xl font-bold">Search</h1>
                <form id="searchField" className="pt-2 relative w-full mx-auto text-gray-600" onSubmit={this.handleSubmit} >
                    <input
                        className="border-2 border-gray-300 bg-white h-10 w-full px-3 pr-20 rounded-xl text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Enter beach name"
                        value={this.state.beachName}
                        onChange={this.handleChange}
                    />

                    <input className="absolute right-0 top-0 mt-4 mr-3 text-center text-white px-2 rounded-lg bg-green-400" type="submit" value="Submit" />
                </form>

                <div>
                    {this.state.submitted ? <HomeSearch beachName={this.state.beachName}/> : null}
                </div>
                
            </React.Fragment>

        )

    }
}



export default SearchForm