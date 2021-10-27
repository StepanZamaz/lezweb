import { collection, onSnapshot } from "@firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Map, Marker, MarkerLayer, MarkerCardConfiguration, CompassControl, MouseControl, KeyboardControl, ZoomControl } from "react-mapycz";
import Mapa from "../components/map/map"
import db from "../utils/firebase";
const MapLayout = () => {
    const[boulders, setBoulders] = useState<DocumentData>([]);
    useEffect(()=>{   
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data()}));
            if(data){
                setBoulders(data);
            }
        })
    },[]);
    return(
        <div>
            <Mapa oblasti={boulders} />
        </div>
        
    )
    
}
export default MapLayout;