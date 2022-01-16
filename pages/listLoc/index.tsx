import { NextPage } from 'next';
import Link from 'next/link';
import { collection, onSnapshot, DocumentData, doc, } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../utils/firebase";
import {Nadpis, Header, SeznamOblasti, ColumnImage, RowImage} from "../../components/styledComponents/styledComponents"
import ImageSlider from "../../components/ImageSlider"
import Gallery from '../../components/Gallery';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const DivWhole = styled.div`
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
    /*
    return(
        <DivWhole>
            
            <RowImage>
                <ColumnImage>
                    
                </ColumnImage>
                <ColumnImage>
                
                </ColumnImage>
            </RowImage>
            <SeznamOblasti>
            <ul>
            {Object.keys(boulders).map((key, index)=>{
                const oblast = boulders[key];
                return(
                    <Link href="/[locations]" as={`/${oblast.id}`} key={oblast.id}>
                        <li>{oblast.nazevOblasti}</li>
                    </Link>
                )
            })
            }
            </ul>
            </SeznamOblasti>
        </DivWhole>
    )*/
}
export default ListLoc;