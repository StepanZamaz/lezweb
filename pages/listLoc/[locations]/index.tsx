import { collection, onSnapshot,doc,where, DocumentData } from "@firebase/firestore";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import db from "../../../utils/firebase";
import Image from 'next/image'
import Gallery from "../../../components/Gallery";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Locations: NextPage = () => {
    const router = useRouter();
    const { locations } = router.query
    const[oblast, setBoulders] = useState<DocumentData>([]);
    useEffect(()=>{
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
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