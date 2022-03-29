import { NextPage } from 'next';
import Link from 'next/link';
import { collection, onSnapshot, DocumentData, doc, } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../utils/firebase";
import ImageSlider from "../../components/ImageSlider"
import Gallery from '../../components/Gallery';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const DivWhole = styled.div`
    min-height: 90vh;
    width: 100%;
    height: 100%;
    background-color: #C3C3C1;
`
const ListLoc: NextPage = () =>{
    const[boulders, setBoulders] = useState<DocumentData>([]);
    useEffect(()=>{
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            if(data){
                setBoulders(data);
            }
        })
    },[]);
    return(
        <>
            <Navbar/>
                <DivWhole>
                    <ImageSlider data={boulders}/>
                </DivWhole>
            <Footer/>
        </>
    )
}
export default ListLoc;