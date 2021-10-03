import { collection, onSnapshot,doc,where, DocumentData } from "@firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import db from "../utils/firebase";

const Test: NextPage = () => {
    const[boulders, setBoulders] = useState<DocumentData>([]);
    
    useEffect(()=>{
        /*onSnapshot(doc(db,"boulders","mladkov","sutr","akupressura"), (snapshot) =>{
            console.log(snapshot.data());
        });*/
        const unsub = onSnapshot(collection(db,"boulders","mladkov","sutr"), (snapshot) =>{
            setBoulders(snapshot.docs.map(doc => doc.data()));
        });
        return unsub;
    },[]);

    return(
        <div>
            <h1>Sutr</h1>
            <div>
                {boulders.map((boulder:DocumentData) =>(
                    <div key={boulder.id}>
                        název: {boulder.nazev}
                        hodnoceni: {boulder.hodnoceni}
                        autor: {boulder.autor}
                    </div>
                ))
            }
            </div>
        </div>
    );
}
export default Test;