import { NextPage } from 'next';
import Link from 'next/link';
import { collection, onSnapshot, DocumentData, doc, } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../utils/firebase";
import {Nadpis, Header, DivWhole, SeznamOblasti, ColumnImage, RowImage} from "../../components/styledComponents/styledComponents"
import ImageSlider from "../../components/ImageSlider"
import Gallery from '../../components/Gallery';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
const ListLoc: NextPage = () =>{
    const[boulders, setBoulders] = useState<DocumentData>([]);
    const[images, setImages] = useState<Object>({});
    const getRandomInt = (min: number, max: number) =>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
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
                <ImageSlider data={boulders}/>
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