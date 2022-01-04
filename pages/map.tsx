import { collection, onSnapshot } from "@firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Map, Marker, MarkerLayer, MarkerCardConfiguration, CompassControl, MouseControl, KeyboardControl, ZoomControl } from "react-mapycz";
import Footer from "../components/Footer";
import Mapa from "../components/map/map"
import Navbar from "../components/Navbar";
import db from "../utils/firebase";
import styled from "styled-components"

const Mapdiv = styled.div`
    height: 80%;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/mladkov%2F2.JPG?alt=media&token=4ca5143f-0a40-46ad-a531-80cf23b057e3);
    background-size: cover;
    padding-top: 100px;
    padding-bottom: 100px;
`
const DisplayMapDiv = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 50px;
    background-color: black;
    border: 2px solid white;
    border-radius: 25px;
`
const MapLayout = () => {
    const [boulders, setBoulders] = useState<DocumentData>([]);
    useEffect(() => {
        onSnapshot(collection(db, "boulders"), snapshot => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
            if (data) {
                setBoulders(data);
            }
        })
    }, []);
    return (
        <>
            <Navbar />
                <Mapdiv>
                    <DisplayMapDiv>
                        <Mapa oblasti={boulders} />
                    </DisplayMapDiv>
                </Mapdiv>
            <Footer />
        </>

    )

}
export default MapLayout;