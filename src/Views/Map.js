import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { Link, useParams } from 'react-router-dom';
import Loader from '../Components/Loader'
import moment from 'moment'
import { useAxiosGet } from '../Hooks/HttpRequests';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: '100vh', width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}
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
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MapComponent
      lat = {this.props.lat}
      lng = {this.props.lng}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
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
            return <Component {...props} lat={beach.dt[name].meta.lat} lng={beach.dt[name].meta.lon} />;
        }
        return (
            <div> {content} </div>
        )
    }
  }
export default SimpleMap(MapWithMarkers);