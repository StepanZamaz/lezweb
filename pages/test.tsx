import { collection, onSnapshot, DocumentData, } from "@firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import db from "../utils/firebase";

const Test: NextPage = () => {
    const[boulders, setBoulders] = useState<DocumentData>([]);
    console.log(boulders);
    //console.log(typeof(boulders));
    useEffect(()=>{
        /*onSnapshot(doc(db,"boulders","mladkov","sutr","akupressura"), (snapshot) =>{
            console.log(snapshot.data());
        });*/
        /*const unsub = onSnapshot(doc(db,"boulders","hlavniSkala"), (snapshot) =>{
            console.log(snapshot.data());
            //setBoulders(snapshot.data)
            //setBoulders(snapshot.data());
        });*/
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));;
            //console.log(data);
            if(data){
                setBoulders(data);
            }
            
            /*oblasti.map(oblast =>{
                //console.log(oblast);

            })*/
            //console.log(oblasti);

        })
        /*
        onSnapshot(doc(db,"boulders","mladkov"), (snapshot) =>{
            const data = snapshot.data();
            //console.log(data);
            if(data){
                setBoulders(data);
            }
        });*/
    },[]);
    return(
        <div key="index">
            {Object.keys(boulders).map(function(key, index){
                const oblast = boulders[key];
                //console.log(oblast);
                return(
                    <div key={index.toString()}>
                        <h1>{oblast.nazevOblasti}</h1>
                        {Object.keys(oblast).map(function(key, index){
                            /*console.log(oblast[key]);
                            console.log(typeof(oblast[key])); */                    
                            if(typeof(oblast[key]) === 'object'){
                                const nazevBloku = oblast[key].nazevBloku;
                                const cesty = oblast[key].cesty;
                                return(
                                    <div key={index.toString()}>
                                        <h1>název bloku: {nazevBloku}</h1>
                                        {Object.keys(cesty).map(function(key){
                                            const val = cesty[key];
                                            //console.log(atr);
                                            return(
                                                <div>
                                                    <h2>{val.nazevCesty}</h2>
                                                    <ul>
                                                        <li>{val.autor}</li>
                                                        <li>{val.hodnoceni}</li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                    
                                )
                            }      
                        })
                        }
                    </div>
                )
            })
            }
        </div>
    )
    /*
    return(
        <div> 
            {Object.keys(boulders).map(function(key, index){
                const nazevBloku = boulders[key].nazevBloku;
                const cesty = boulders[key].cesty;
                //console.log(cesty);
                return(
                    <div key={index}>
                        <h1>název bloku: {nazevBloku}</h1>
                        {
                        Object.keys(cesty).map(function(key){
                            const atr = cesty[key];
                            //console.log(atr);
                            return(
                                <div>
                                    <h2>{atr.nazevCesty}</h2>
                                    <ul>
                                        <li>{atr.autor}</li>
                                        <li>{atr.hodnoceni}</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                    </div>
                    
                )
                //console.log(nazevBloku)
                //console.log(boulders[key]);
                //return konecSveta;
                //console.log(boulders[key].cesty.konecSveta);
                /*
                return(
                    <div key={index}>
                        <h1>{}</h1>
                        <h2>{konecSveta}</h2>
                        <ul>
                            <li>autor: {konecSveta.autor}</li>
                            <li>hodnocení: {konecSveta.hodnoceni}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )*/
}
export default Test;

/*
{boulders.map((boulder:DocumentData) =>(
    <div>
        ahoj
        <h1>ahoj{boulder.hlavniSkala}</h1>
            <div key={boulder.id}>
                název: {boulder.nazev}
                hodnoceni: {boulder.hodnoceni}
                autor: {boulder.autor}
            </div>
    </div>
))
}
*/