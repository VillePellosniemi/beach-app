import React from 'react';
import { compose } from "recompose"
import Loader from '../Components/Loader'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment'
import { useAxiosGet } from '../Hooks/HttpRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faMap, faGlobeEurope, faInfoCircle, faTags } from '@fortawesome/free-solid-svg-icons';


const SinglePageComponent = compose(
)((props) =>
    <div className="bg-gray-100">
        <img src={`images/${props.name}.jpg`} className="relative object-cover h-60 w-full" />

        <div className="absolute w-full -mt-20 rounded-t-3xl bg-white py-8 mb-6">
            <h1 className="text-center font-bold text-2xl">{props.beach_name} </h1>

            <div className="flex items-center p-3">
                <span className="flex-1 text-center text-green-500 text-xl" onClick={props.updateLikes}>
                    <FontAwesomeIcon icon={faThumbsUp} className={props.state.likeButton}/>
                    <h1 className="text-base">{props.state.likes} liked</h1>
                </span>

                <span className="flex-1 text-center text-red-500 text-xl" onClick={props.onFavoriteClick}>
                    <FontAwesomeIcon icon={faHeart} className={props.state.heart} />
                    <h1 className="text-base" >{props.state.favoriteMessage}</h1>
                </span>

                <span className="flex-1 text-center text-blue-500 text-xl">
                    <Link to={`/${props.name}/map`}>
                        <FontAwesomeIcon icon={faMap} />
                        <h1 className="text-base">map</h1>
                    </Link>
                </span>

                <span className="flex-1 text-center text-yellow-500 text-xl">
                    <a href={`${props.web}`}>
                        <FontAwesomeIcon icon={faGlobeEurope} />
                        <h1 className="text-base">website</h1>
                    </a>
                </span>
            </div>

            <div className="flex content-center text-xl pb-2 px-2 ">
                <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                    <h1>Water temp</h1>
                    <h1 className="text-4xl">{props.temp_water}°C </h1>
                </div>

                <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                    <h1>Air temp</h1>
                    <h1 className="text-4xl">{props.temp_air}°C </h1>
                </div>
            </div>
            
            <div className="flex content-center text-xl pb-2 px-2">
                <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                    <h1>Services</h1>
                    <h1 className="text-4xl"><a href={`${props.url}?p=1&t=accessibilityDetails`}><FontAwesomeIcon icon = {faInfoCircle}/></a></h1>
                </div>

                <div className="flex-1 text-center rounded-xl bg-gray-200 h-40 m-2 pt-8 p-6">
                    <h1>Discount</h1>
                    <Link to = {`${props.name}/promodiscount`} className = "text-4xl">
                        <FontAwesomeIcon icon = {faTags} />
                    </Link>
                </div>
            </div>

            <div className="absolute w-full bottom-0 left-0 mb-3 text-center text-gray-600 italic">
                <h1>Last updated: {props.time}</h1>
            </div>
        </div>
    </div>
)


class SinglePageClass extends React.PureComponent {
    constructor(props){

        super(props);
        this.state = {
            heart: this.props.heart,
            favoriteMessage: this.props.favoriteMessage,
            likeButton: this.props.likeButton,
            likes: this.props.likes,
            updated: JSON.parse(localStorage.getItem(this.props.name))
        }
        this.updateLikes = this.updateLikes.bind(this)
      }

    ////////////////////////////////// Like ////////////////////////////////
    updateLikes = () => {
        if(!this.state.updated) {
            localStorage.setItem(this.props.name, "true");
            this.setState((prevState, props) => {
                return {
                    likes: prevState.likes + 1,
                    likeButton: 'text-green-500',
                    updated: true
                }
                
            })
            //localStorage.setItem(this.props.name, this.props.likes);
        } else {
            localStorage.setItem(this.props.name, "false");
            this.setState((prevState, props) => {
                return {
                    likes: prevState.likes - 1,
                    likeButton: 'text-gray-500',
                    updated: false
                }
            })
            //localStorage.setItem(this.props.name, this.props.likes);
        }
    }

    /////////////////////////Add to favorite/////////////////////////////////////
    handleFavoriteClick = () => {
        console.log("Favorite clicked! ", this.props.name);
        if (!this.props.favorites.includes(this.props.name)) {
            this.props.favorites.push(this.props.name);
            localStorage.setItem("favorites", JSON.stringify(this.props.favorites));
            this.setState({ heart: 'text-red-500', favoriteMessage: 'favorited' })
        } else {
            var array = this.props.favorites
            var index = array.indexOf(this.props.name)
            if (index !== -1) {
                array.splice(index, 1);
            }
            localStorage.setItem("favorites", JSON.stringify(this.props.favorites));
            this.setState({ heart: 'text-gray-500', favoriteMessage: 'favorite' })
        }
    }

    

    render() {
        return (
            <SinglePageComponent
                beach_name={this.props.beach_name}
                name={this.props.name}
                temp_water={this.props.temp_water}
                temp_air={this.props.temp_air}
                url = {this.props.url}
                web = {this.props.web}
                favorites={this.props.favorites}
                time={this.props.time}
                likes = {this.props.likes}
                state={this.state}
                onFavoriteClick={this.handleFavoriteClick}
                updateLikes = {this.updateLikes}
            />
        )
    }
}

function SinglePage(Component) {
    return function WrappedComponent(props) {
        const { name } = useParams();
        const url = "https://iot.fvh.fi/opendata/uiras/uiras2_v1.json"
        let beach = useAxiosGet(url)
        let content = null
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        let heart = 'text-gray-500';
        let favoriteMessage = 'favorite';
        let likes = 68;
        let likeButton = 'text-gray-500'

        if (beach.loading) {
            content = <Loader />
        }
        if (!favorites) {
            favorites = [];
        }
        if (favorites && favorites.includes(name)) {
            heart = 'text-red-500';
            favoriteMessage = 'favorited'
        }

        if (JSON.parse(localStorage.getItem(name))) {
            likeButton = 'text-green-500'
            likes = likes + 1
        } 

        if (beach.dt) {
            console.log(beach);
            return <Component {...props}
                time = {moment(beach.dt[name].data.slice(-1)[0].time).fromNow()}
                temp_water={Math.round(beach.dt[name].data.slice(-1)[0].temp_water * 10) / 10}
                temp_air={Math.round(beach.dt[name].data.slice(-1)[0].temp_air * 10) / 10}
                url = {beach.dt[name].meta.servicemap_url}
                web = {beach.dt[name].meta.site_url}
                favorites={favorites}
                name={name}
                beach_name={beach.dt[name].meta.name}
                heart={heart}
                favoriteMessage={favoriteMessage}
                likes = {likes}
                likeButton = {likeButton}
            />;
        }
        return (
            <div className=""> {content} </div>
        )
    }
}

export default SinglePage(SinglePageClass);