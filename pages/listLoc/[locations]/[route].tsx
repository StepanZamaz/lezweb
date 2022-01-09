import React, { useEffect, useState } from 'react'
import  {useRouter} from 'next/router'
import db from "../../../utils/firebase";
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import DetailOfRoute from '../../../components/DetailOfRoute';
const Route = () => {
    const router = useRouter();
    const {locations, route} = router.query;
    const [boulders, setBoulders] = useState<DocumentData>({});
    useEffect(()=>{
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            const listedData = data?.find(x => x.id === locations);
            if(listedData){
                setBoulders(listedData);
            }
        })
    },[locations]);
    console.log("x", boulders)
    console.log("xx",route)
    return (
        <div>
            <Navbar/>
                <DetailOfRoute data={boulders}/>
            <Footer/>
        </div>
    )
}

export default Route;
