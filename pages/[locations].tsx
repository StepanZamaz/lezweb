import { collection, onSnapshot,doc,where, DocumentData } from "@firebase/firestore";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import db from "../utils/firebase";

const Locations: NextPage = () => {
    const router = useRouter();
    const locId = router.query.locations;
    const[oblast, setBoulders] = useState<DocumentData>([]);
    console.log(oblast);
    useEffect(()=>{
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            console.log(locId);
            const listedData = data?.find(x => x.id === locId);
            if(listedData){
                setBoulders(listedData);
            }
        })
    },[]);
    return(
        <div>
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
    );
}
export default Locations;