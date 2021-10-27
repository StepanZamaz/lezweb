import React from "react";
import {Map, Marker, MarkerCardConfiguration} from "react-mapycz";

type MarkerItems = {
    lat: number;
    lng: number;
    data: MarkerCardConfiguration;
}

const Markers: React.FC<MarkerItems> = ({lat, lng, data})=>{
    return (
        <Marker coords={{lat,lng}} card={data}/>
    );
};

export default Markers;