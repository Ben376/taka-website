import React from 'react';
import fetch from 'isomorphic-fetch';
import {compose, withProps} from 'recompose';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Geocode from "react-geocode";


const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
	<GoogleMap defaultZoom={5} defaultCenter={{lat: 47, lng: 0}}>
	<MarkerClusterer
		onClick={props.onMarkerClustererClick}
		averageCenter
		enableRetinaIcons
		gridSize={60}
	>
	{props.markers.map((marker,i) => (
	<Marker
		key={i}
		position={{ lat: marker.lat, lng: marker.lng }}
	/>
))}

	</MarkerClusterer>
  </GoogleMap>
);

class Map extends React.Component {
	constructor(props) {
  	super(props);
  	this.state = { markers: [], address: [] };
	}

  componentWillMount() {
			fetch('/sql/localisation')
				.then(results => results.json())
				.then(data => {this.setState({address:data})})
				.then(add => {this.setState({ address: this.state.address.map(x => (x.address + ' ' + x.zip_code))})})
				.then(marker => this.state.address.map(y => Geocode.fromAddress(y).then(
					response => {
						 this.setState({markers: [...this.state.markers, response.results[0].geometry.location]});
						},
						error => {
							console.error(error);
						}
				)))
		};

	render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}






export default Map;
