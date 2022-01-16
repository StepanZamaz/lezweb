import { DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { CgBackspace } from 'react-icons/cg'
import styled from 'styled-components'
const RouteCard = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
    margin-right: 15%;
    margin-left: 15%;
    border: 5px solid #323232;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 40% 55%;
    grid-template-rows: 20% 75%;
    grid-gap: 5%;
    grid-template-areas: 
        "header  image"
        "content image"
    ;
    background-color: #323232;
    color:#61ed84;;
`
const NazevCesty = styled.div`
    height: 100%;
    padding: 5% 0;
    padding-left: 10%;
    grid-area: header;
    font-size: 3em;
    text-align: center;
    vertical-align: middle;
`
const Img = styled.img`
    grid-area: image;
    display: block;
    width: 100%;
`
const DivNazevLoc = styled.h1`
    font-size: 4em;
    padding: 1rem;
    text-align: center;
    color: #323232;
`
const DivNazevBlok = styled.h1`
    text-align: center;
    padding: 1em;
    border-bottom: 3px solid #323232;
    border-top: 3px solid #323232;
    color: #323232;
`
const InformationDiv = styled.div`
    padding: 5%;
    grid-area: content;
    display: grid;
    grid-template-columns: 50% 45%;
    grid-template-rows: 10% 10% 50%;
    grid-gap: 5%;
    margin-left: 5%;
    grid-template-areas: 
        "autor  rating"
        "material range"
        "describe describe"
    ;
`
const DetailRouteDiv = styled.div`
    min-height: 95vh;
    background-color: #C3C3C1;
    position: relative;
`
const BackDiv = styled.div`
    position: absolute; 
    top: 20px; 
    left: 20px;
    width: 8vw;
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
`
const BackIcon = styled(CgBackspace)`
    font-size: 2rem;
`
const AutorDiv = styled.div`
    grid-area: autor;
    display: flex;
    justify-content: flex-start;
`
const RatingDiv = styled.div`
    grid-area: rating;
    display: flex;
    justify-content: flex-start;
`
const RangeDiv = styled.div`
    grid-area: range;
    display: flex;
    justify-content: flex-start;
`
const DescribeDiv = styled.div`
    grid-area: describe;
    display: flex;
    justify-content: space-between;
`
const MaterialDiv = styled.div`
    grid-area: material;
    display: flex;
    justify-content: flex-start;
`
const DisplayDescribeDiv = styled.div`
    width: 75%;
    font-size: 1.2em;
`
const DescribeDivText = styled.div`
    width: 15%;
    font-size: 1.2em;
    font-weight: bold;
`
const DescriptionDiv = styled.div`
    font-size: 1.2em;
    font-weight: bold;
`
const DataDiv = styled.div`
    margin-left: 5%;
    font-size: 1.2em;
`
const DetailOfRoute = ({data}: DocumentData) => {
    const router = useRouter();
    const { route} = router.query;
    const boulders = data;
    console.log("xxx",boulders)
    console.log("xxxx",route)
    return (
        <DetailRouteDiv>
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
                                                        <AutorDiv>
                                                            <DescriptionDiv>autor: </DescriptionDiv> 
                                                            <DataDiv>{cesta.autor}</DataDiv>
                                                        </AutorDiv>
                                                        <RatingDiv>
                                                            <DescriptionDiv>hodnocení cesty: </DescriptionDiv>  
                                                            <DataDiv>{cesta.hodnoceni}</DataDiv> 
                                                        </RatingDiv>
                                                        <MaterialDiv>
                                                            <DescriptionDiv>materiál:</DescriptionDiv> 
                                                            <DataDiv>{cesta.material}</DataDiv> 
                                                        </MaterialDiv>
                                                        <RangeDiv>
                                                            <DescriptionDiv>délka:</DescriptionDiv>
                                                            <DataDiv>{cesta.delka}</DataDiv> 
                                                        </RangeDiv>
                                                        <DescribeDiv>
                                                            <DescribeDivText>popis cesty: </DescribeDivText> 
                                                            <DisplayDescribeDiv>{cesta.popisCesty}</DisplayDescribeDiv> 
                                                        </DescribeDiv>
                                                    </InformationDiv>
                                                    {
                                                        cesta.img === "" ?(
                                                            <Img src="https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/unknown%2FUnkownRock.png?alt=media&token=e51ad124-69b1-4de5-b345-1063e02cadff" alt={cesta.id}/>
                                                            
                                                        ):(
                                                            <Img src={cesta.img} alt={cesta.id}/>
                                                        )
                                                    }                                         
                                                    
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
            <BackDiv onClick={() => router.back()}>
                <BackIcon/> Zpět na bloky
            </BackDiv>
        </DetailRouteDiv>
    )
}

export default DetailOfRoute
