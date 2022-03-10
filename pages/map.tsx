import { collection, onSnapshot } from "@firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Map, Marker, MarkerLayer, MarkerCardConfiguration, CompassControl, MouseControl, KeyboardControl, ZoomControl } from "react-mapycz";
import Footer from "../components/Footer";
import Mapa from "../components/map/map"
import Navbar from "../components/Navbar";
import db from "../utils/firebase";
import styled from "styled-components"
import { device } from "../components/styledComponents/device";
const Mapdiv = styled.div`
    min-height: 100vh;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/mladkov%2F2.JPG?alt=media&token=4ca5143f-0a40-46ad-a531-80cf23b057e3);
    background-size: cover;
    padding-top: 5%;
    padding-bottom: 5%;
`
const DisplayMapDiv = styled.div`
    position: relative;
    height: 90vh;
    width: 75vw;
    margin-left: auto;
    margin-right: auto;
    padding: 50px;
    background-color: black;
    border: 2px solid white;
    border-radius: 25px;
    @media ${device.laptop}{
        width: 90vw;
        padding: 25px;
    }
    @media (max-width: 550px){
        width: 98vw;
        padding: 10px;
    }
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