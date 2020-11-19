import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { Link, useParams } from 'react-router-dom';
import Loader from '../Components/Loader'
import moment from 'moment'
import { useAxiosGet } from '../Hooks/HttpRequests';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `80%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: '95vh', width: '100%'}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown &&
      <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick}>
        {props.isOpen &&
          <InfoWindow onCloseClick={props.onhandleCloseClick}>
            <div>
              <h1 className="text-base mb-2 font-bold text-center">{props.name}</h1>
              <a className="text-blue-400 text-base" href={"https://maps.google.com?q=" + props.name + "::" + props.lat + "," + props.lng}>View on Google Maps</a>
              <br/>
              <a className="text-blue-400 text-base" href={"https://reittiopas.hsl.fi/reitti/%20/" + props.name + "::" + props.lat + "," + props.lng}>View on HSL</a>
            </div>
          </InfoWindow>
        }
      </Marker>
    }
  </GoogleMap>
)

class MapWithMarkers extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 500)
  }

  handleMarkerClick = () => {
    console.log("Marker clicked!");
    this.setState({ isOpen: true })
  }

  handleCloseClick = () => {
    console.log("Marker Closed!");
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <MapComponent
        lat={this.props.lat}
        lng={this.props.lng}
        name={this.props.name}
        site_url={this.props.site_url}
        isMarkerShown={this.state.isMarkerShown}
        isOpen={this.state.isOpen}
        onMarkerClick={this.handleMarkerClick}
        onhandleCloseClick={this.handleCloseClick}
      />
    )
  }
}

function SimpleMap(Component) {
  return function WrappedComponent(props) {
    const { name } = useParams();
    const url = "https://iot.fvh.fi/opendata/uiras/uiras2_v1.json"
    let beach = useAxiosGet(url)
    let content = null
    if (beach.loading) {
      content = <Loader />
    }
    if (beach.dt) {
      console.log(beach);
      return <Component {...props}
        lat={beach.dt[name].meta.lat}
        lng={beach.dt[name].meta.lon}
        name={beach.dt[name].meta.name}
        site_url={beach.dt[name].meta.site_url}
      />;
    }
    return (
      <div> {content} </div>
    )
  }
}
export default SimpleMap(MapWithMarkers);