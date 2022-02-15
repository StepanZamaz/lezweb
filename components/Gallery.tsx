import { DocumentData, FieldValue } from "@firebase/firestore";
import Link from "next/link";
import React from "react";
import Imgix from "react-imgix";
import styled from "styled-components";
import {CgBackspace} from "react-icons/cg"
import { useRouter } from "next/router";

const OblastDiv = styled.div`
    padding: 3em;
    min-height: 90vh;
    background-color: #C3C3C1;
    position: relative;
`
const BackDiv = styled.div`
    position: absolute; 
    top: 20px; 
    left: 20px;
    width: 11vw;
    height: 3vh;
    background-color: #000;
    border: 2px solid #61ed84;
    border-radius: 10px;
    cursor: pointer;
    color: #61ed84;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vw;
    text-transform: uppercase;
`
const BackIcon = styled(CgBackspace)`
    font-size: 2rem;
`
const Container = styled.div`
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    margin-bottom: 5vh;
    margin-top: 5vh;
`
const Image = styled.img`
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
`
const Middle = styled.div`
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    cursor: pointer;
`
const ImageCard = styled.div`
    &:hover ${Image} {
        opacity: 0.3;
    }
    &:hover ${Middle} {
        opacity: 1;
    }
    border: 1px solid #101010;
    border-radius: 2px;
    padding: 1em;
    position: relative;
`
const DivNazevLoc = styled.h1`
    font-size: 4em;
    padding: 1rem;
    text-align: center;
    color: #323232;
`
const DivNazevObl = styled.h1`
    text-align: center;
    padding: 1em;
    border-bottom: 3px solid #323232;
    border-top: 3px solid #323232;
    color: #323232;
`
const Cesta = styled.div`
    background-color: #101010;
    color: #61ed84;
    font-size: 16px;
    padding: 16px 32px;
`
const Gallery = ({data}:DocumentData) =>{
    console.log(data)
    const router = useRouter();
    return(
        <OblastDiv>
            <DivNazevLoc>{data.nazevOblasti}</DivNazevLoc>
            {
                Object.keys(data).map((key, index)=>{
                    const nazevBloku = data[key].nazevBloku;
                    const cesty = data[key].cesty;
                    //console.log(cesty)
                    if(typeof(nazevBloku) === "string"){
                        return(
                            <React.Fragment key={index}>
                                <DivNazevObl>{nazevBloku}</DivNazevObl>
                                <Container>
                                {Object.keys(cesty).map((key1, index) =>{
                                    const cesta = cesty[key1];
                                    return(
                                        <React.Fragment key={index}>
                                                <Link href="/listLoc/[locations]/[route]" as={`/listLoc/${data.id}/${cesta.id}/`} key={cesta.id}>
                                                    <ImageCard>
                                                        {cesta.img === "" ? (
                                                                <Image src="https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/unknown%2FUnkownRock.png?alt=media&token=e51ad124-69b1-4de5-b345-1063e02cadff" alt={cesta.id} />
                                                            ):(
                                                                <Image src={cesta.img} alt={cesta.id} />
                                                            )
                                                        }
                                                        <Middle>
                                                            <Cesta>{cesta.nazevCesty}</Cesta>
                                                        </Middle>
                                                    </ImageCard>
                                                </Link>
                                        </React.Fragment>
                                    )
                                })}
                                </Container>
                            </React.Fragment>
                        )
                    }
                })
            }
            <BackDiv onClick={() => router.back()}>
                <BackIcon/> Zpět na oblasti
            </BackDiv>
        </OblastDiv>
    )
    
    
}
export default Gallery;