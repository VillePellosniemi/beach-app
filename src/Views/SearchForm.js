import React from 'react';
import HomeSearch from "./HomeSearch";


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
                <form id="searchField" className="m-1 text-center" onSubmit={this.handleSubmit} >
                    <input
                        className="outline-black"
                        type="text"
                        name="beachName"
                        value={this.state.beachName}
                        onChange={this.handleChange}
                    />
                    <input className="m-1 text-center" type="submit" value="Submit" />
                </form>
              {this.state.submitted ? <HomeSearch beachName={this.state.beachName}/> : null}

            </React.Fragment>

        )

    }
}



export default SearchForm