import { DocumentData } from '@firebase/firestore';
import React from 'react';
import { Map, KeyboardControl, ZoomControl, MouseControl, CompassControl, MarkerLayer, MarkerCardConfiguration, SyncControl } from 'react-mapycz';
import Markers from "./markers";
type MarkersListProps = {
    oblasti: DocumentData;
}
const Mapa: React.FC<MarkersListProps> = ({ oblasti }) => {
    return (
        <Map height='650px' center={{ lat: 50.0968800, lng: 16.6379681 }}>
            <KeyboardControl />
            <ZoomControl />
            <MouseControl zoom={true} pan={true} wheel={true} />
            <CompassControl right={10} top={50} />
            <SyncControl />
            <MarkerLayer>
                {Object.keys(oblasti).map((key, index) => {
                    const oblast = oblasti[key];
                    return (
                        <React.Fragment key={index}>
                            {Object.keys(oblast).map((key, index) => {
                                if (typeof (oblast[key]) === 'object') {
                                    const blok = oblast[key];
                                    const lat = oblast[key].lat;
                                    const lng = oblast[key].lng;
                                    const nazevBloku = oblast[key].nazevBloku
                                    let poleCest: string[] = [];
                                    return (
                                        <React.Fragment key={index}>
                                            {Object.keys(blok).map((key, index) => {
                                                if (typeof (blok[key]) === 'object') {
                                                    const cesty = blok[key];
                                                    //console.log(cesty);
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {Object.keys(cesty).map((key, index) => {
                                                                const cesta = cesty[key].nazevCesty;
                                                                poleCest.push(cesta);
                                                                console.log(poleCest);
                                                                let bodyProps: string = "";
                                                                for (let index in poleCest) {
                                                                    bodyProps += poleCest[index] + "<br>";
                                                                } 
                                                                const data: MarkerCardConfiguration = {
                                                                    header: "<strong>" + nazevBloku + "</strong>",
                                                                    body: bodyProps,
                                                                    options: {
                                                                        width: 500,
                                                                        height: 500
                                                                    }
                                                                }

                                                                return (
                                                                    <React.Fragment key={index}>
                                                                        <Markers lat={lat} lng={lng} data={data}></Markers>
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </React.Fragment>
                                                    )
                                                }
                                            })}
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </React.Fragment>
                    )
                })}
            </MarkerLayer>
        </Map>


    )
}
export default Mapa;
/*{Object.keys(oblasti).map(function(key, index){
    const oblast = oblasti[key];
    {Object.keys(oblast).map(function(key, index){
        const nazevBloku = oblast[key].nazevBloku;
        console.log(nazevBloku);
        const lat = oblast[key].lat;
        const lng = oblast[key].lng;
        const cesty = oblast[key].cesty;

    }

    
    //console.log(cesty);
    return(
        <React.Fragment key={key}>
            {Object.keys(cesty).map(function(key){
                const val = cesty[key];
                const data:MarkerCardConfiguration = {
                    header: nazevBloku,
                    body: "Ahoj",
                    options:{
                        width: 500,
                        height: 500
                    }
                }
                return(
                    <React.Fragment key={key}>
                        <Markers key={key} lat={lat} lng={lng} data={data} ></Markers>
                    </React.Fragment>
                )
            })
            }
        </React.Fragment>
        
    )
      
})
}*/