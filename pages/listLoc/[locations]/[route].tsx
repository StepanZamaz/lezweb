import React, { useEffect, useState } from 'react'
import  {useRouter} from 'next/router'
import db from "../../../utils/firebase";
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
const RouteCard = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
    margin-right: 10%;
    margin-left: 10%;
    border: 5px solid #101010;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 50% 45%;
    grid-gap: 5%;
    grid-template-areas: 
        "header  image"
        "content image"
    ;
    background-color: #101010;
    color:#61ed84;;
`
const NazevCesty = styled.h1`
    grid-area: header;
    font-size: 3em;
    text-align: center;
`
const Img = styled.img`
    grid-area: image;
    display: block;
    width: 100%;
`
const DivNazevLoc = styled.h1`
    font-size: 4em;
    text-align: center;
    border-bottom: 3px solid #101010;
    padding-bottom: 3rem;
`
const DivNazevBlok = styled.h1`
    font-size: 3em;
    text-align: center;
`
const InformationDiv = styled.div`
    grid-area: content;
`
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
    return (
        <div>
            <Navbar/>
            {
                Object.keys(boulders).map((key,index) =>{
                    const nazevOblasti = boulders.nazevOblasti;
                    const boulder = boulders[key];
                    const nazevBloku = boulder.nazevBloku;
                    console.log(nazevBloku)
                    if(typeof(boulders[key]) === 'object'){
                        const cesty = boulders[key].cesty;
                        return(
                            <React.Fragment key={index}>
                            {
                                Object.keys(cesty).map((key1) =>{
                                    const cesta = cesty[key1];
                                    if(cesta.id === route){
                                        return(
                                            <React.Fragment key={cesta.id}>
                                                {/*<ImageBackground></ImageBackground>*/}
                                                <DivNazevLoc>{nazevOblasti}</DivNazevLoc>
                                                <DivNazevBlok>{nazevBloku}</DivNazevBlok>
                                                <RouteCard>
                                                    <NazevCesty>{cesta.nazevCesty}</NazevCesty>
                                                    <InformationDiv>
                                                        <p>autor: {cesta.autor}</p>
                                                        <p>hodnocení cesty: {cesta.hodnoceni}</p>
                                                        <p>popis cesty: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nullam eget nisl. Aliquam erat volutpat. Etiam neque. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Maecenas libero. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nulla non arcu lacinia neque faucibus fringilla. Mauris metus. Duis viverra diam non justo.</p>
                                                        <p>materiál: žula</p>
                                                    </InformationDiv>                                                 
                                                    <Img src={cesta.img} alt={cesta.id}/>
                                                </RouteCard>
                                            </React.Fragment>
                                        )
                                    }
                                })
                            }
                            </React.Fragment>
                        )
                    }
                })
            }
            <Footer/>
        </div>
    )
}

export default Route;
