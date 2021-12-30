import { collection, onSnapshot,doc,where, DocumentData } from "@firebase/firestore";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import {Nadpis, DetailImg} from "../../../components/styledComponents/styledComponents"
import db from "../../../utils/firebase";
import Image from 'next/image'
import Gallery from "../../../components/Gallery";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Locations: NextPage = () => {
    const router = useRouter();
    const { locations } = router.query
    const[oblast, setBoulders] = useState<DocumentData>([]);
    //console.log(oblast)
    useEffect(()=>{
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            //console.log(locations);
            //console.log(data);
            const listedData = data?.find(x => x.id === locations);
            if(listedData){
                setBoulders(listedData);
            }
        })
    },[locations]);
    return(
        <div>
            <Navbar/>
                <Gallery data={oblast}></Gallery>
            <Footer/>
        </div>
    );
}
export default Locations;
/*
<div>
            <h1>{oblast.nazevOblasti}</h1>
            {Object.keys(oblast).map((key, index)=>{
                            if(typeof(oblast[key]) === 'object'){
                                const nazevBloku = oblast[key].nazevBloku;
                                const cesty = oblast[key].cesty;
                                return(
                                    <div key={index.toString()}>
                                        <h1>název bloku: {nazevBloku}</h1>
                                        {Object.keys(cesty).map((key)=>{
                                            const val = cesty[key];
                                            return(
                                                <div>
                                                    <h2>{val.nazevCesty}</h2>
                                                    <ul>
                                                        <Image src={val.img} alt={val.id} width={616} height={416}/>
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
        </div>*/