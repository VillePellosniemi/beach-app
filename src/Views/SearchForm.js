import React from 'react';
import SearchBeach from "../Views/SearchBeach";

class SearchForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            beachName: '',
            submitted: false
        };
    }

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
        });


    // console.log('A name was submitted: ' + this.state.beachName)


        }

    render() {
        return (
            <React.Fragment>
                <form className="m-1 text-center" onSubmit={this.handleSubmit}>
                    <input
                        className="outline-black"
                        type="text"
                        name="beachName"
                        value={this.state.beachName}
                        onChange={this.handleChange}
                    />
                    <input className="m-1 text-center" type="submit" value="Submit" />
                </form>
              {this.state.submitted ? <SearchBeach beachName={this.state.beachName}/> : null}
            </React.Fragment>
        );
    }

}



export default SearchForm