import { DocumentData } from '@firebase/firestore';
import React from 'react';
import { Map, KeyboardControl, ZoomControl, MouseControl, CompassControl, MarkerLayer, MarkerCardConfiguration, SyncControl } from 'react-mapycz';
import Markers from "./markers";
type MarkersListProps = {
    oblasti: DocumentData;
}
const Mapa: React.FC<MarkersListProps> = ({ oblasti }) => {
    return (
        <Map height='100%' center={{ lat: 50.0968800, lng: 16.6379681 }}>
            <KeyboardControl />
            <ZoomControl left={10} top={5}/>
            <MouseControl zoom={true} pan={true} wheel={true} />
            <CompassControl left={10} top={50} />
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
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {Object.keys(cesty).map((key, index) => {
                                                                const cesta = cesty[key].nazevCesty;
                                                                poleCest.push(cesta);
                                                                let bodyProps: string = "";
                                                                for (let index in poleCest) {
                                                                    bodyProps += poleCest[index] + "<br>";
                                                                } 
                                                                const data: MarkerCardConfiguration = {
                                                                    header: () => <>Název bloku: <strong>{nazevBloku}</strong></>,
                                                                    body:  "Cesty: " + "<br>" + "<strong>" + bodyProps + "</strong>" ,
                                                                    footer: () => <>Oblast: <strong>{oblast.nazevOblasti}</strong></>,
                                                                    options: {
                                                                        width: 280,
                                                                        height: 500,
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