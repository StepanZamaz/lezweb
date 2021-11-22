import { DocumentData, FieldValue } from "@firebase/firestore";
import React from "react";
import Imgix from "react-imgix";
import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
`
const Image = styled.img`
    width: 100%;
    height: auto;
`
const Gallery = ({data}:DocumentData) =>{
    //console.log(data);
    //console.log(typeof(data.length))
    return(
        <div>
            <h1>{data.nazevOblasti}</h1>
            {
                Object.keys(data).map((key, index)=>{
                    const nazevBloku = data[key].nazevBloku;
                    const cesty = data[key].cesty;
                    //console.log(cesty)
                    if(typeof(nazevBloku) === "string"){
                        return(
                            <React.Fragment key={index}>
                                <h1>{nazevBloku}</h1>
                                <Container>
                                {Object.keys(cesty).map((key1, index) =>{
                                    const cesta = cesty[key1];
                                    console.log(cesta)
                                    return(
                                        <React.Fragment key={index}>
                                                <div>
                                                    <Image src={cesta.img} alt={cesta.id} />
                                                </div>
                                            
                                        </React.Fragment>
                                    )
                                })}
                                </Container>
                            </React.Fragment>
                        )
                    }
                })
            }
        </div>
    )
    
    
}
export default Gallery;