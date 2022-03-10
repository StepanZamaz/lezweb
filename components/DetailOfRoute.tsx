import { DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { CgBackspace } from 'react-icons/cg'
import { GoReport } from 'react-icons/go'
import styled from 'styled-components'
import ReportModal from './modals/ReportModal'
import CommentComponent from './CommentComponent'
import { device } from './styledComponents/device'
const RouteCard = styled.div`
    position: relative;
    margin-top: 5%;
    margin-right: 15%;
    margin-left: 15%;
    padding-bottom: 10px;
    border: 5px solid #323232;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 40% 55%;
    grid-template-rows: 10% auto 40%;
    column-gap: 5%;
    grid-template-areas: 
        "header  image"
        "content image"
        "comment comment"
    ;
    background-color: #323232;
    color:#61ed84;
    height: auto;
    @media ${device.tablet}{
        grid-template-columns: 100%;
        grid-template-rows: 10% auto 30% 40%;
        column-gap: 0;
        grid-template-areas: 
        "header"
        "image"
        "content"
        "comment";
        padding-bottom: 250px;
        margin-right: 5%;
        margin-left: 5%;
    }
    @media ${device.mobileL}{
        grid-template-rows: 10% auto 30% 50%;
        padding-bottom: 150px;
    }
    @media ${device.mobileM}{
        padding-bottom: 100px;
    }
`
const NazevCesty = styled.div`
    height: 100%;
    padding: 5% 0;
    padding-left: 10%;
    grid-area: header;
    font-size: 3em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${device.laptop}{
        font-size: 2em;
    }
    @media ${device.tablet}{
        padding-left: 0%;
    }
    @media ${device.mobileM}{
        font-size: 1.5em;
    }
`
const Img = styled.img`
    width: 100%;
`
const DivNazevLoc = styled.h1`
    font-size: 4em;
    padding: 1rem;
    padding-top: 4.5rem;
    text-align: center;
    color: #323232;
    @media ${device.tablet}{
        font-size: 3em;
    }
    @media ${device.mobileL}{
        font-size: 2em;
    }
`
const DivNazevBlok = styled.h1`
    font-size: 3em;
    text-align: center;
    padding: 1em;
    border-bottom: 3px solid #323232;
    border-top: 3px solid #323232;
    color: #323232;
    @media ${device.tablet}{
        font-size: 2em;
    }
    @media ${device.mobileL}{
        font-size: 1em;
    }
`
const InformationDiv = styled.div`
    position: relative;
    padding: 6%;
    grid-area: content;
    display: flex;
    margin-left: 5%;
    justify-content: space-around;
    flex-direction: column;
    height: 90%;
`
const DetailRouteDiv = styled.div`
    min-height: 95vh;
    background-color: #C3C3C1;
    position: relative;
    height: auto;
    padding-bottom: 7%;
`
const BackDiv = styled.div`
    position: absolute; 
    top: 20px; 
    left: 20px;
    width: 200px;
    height: 50px;
    background-color: #000;
    border: 2px solid #61ed84;
    border-radius: 10px;
    cursor: pointer;
    color: #61ed84;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    text-transform: uppercase;
`
const BackIcon = styled(CgBackspace)`
    font-size: 2rem;
`
const AutorDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media ${device.tablet}{
        font-size: 1em;
    }
    @media (max-width: 600px){
        font-size: 0.8em;
    }
`
const RatingDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media ${device.tablet}{
        font-size: 1em;
    }
    @media (max-width: 600px){
        font-size: 0.8em;
    }
`
const RangeDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media ${device.tablet}{
        font-size: 1em;
    }
    @media (max-width: 600px){
        font-size: 0.8em;
    }
`
const DescribeDiv = styled.div`
    display: flex;
    justify-content: space-between;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media ${device.tablet}{
        font-size: 1em;
    }
    @media (max-width: 600px){
        font-size: 0.8em;
    }
`
const MaterialDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media ${device.tablet}{
        font-size: 1em;
    }
    @media (max-width: 600px){
        font-size: 0.8em;
    }
`
const DisplayDescribeDiv = styled.div`
    width: 70%;
    font-size: 1.2em;
`
const DescribeDivText = styled.div`
    width: 25%;
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
const ImageDiv = styled.div`
    grid-area: image;
    display: block;
    width: 100%;
    height: auto;
`
const DetailOfRoute = ({ data }: DocumentData) => {
    const router = useRouter();
    const { route } = router.query;
    const boulders = data;
    console.log("xxx", boulders)
    console.log("xxxx", route)
    return (
        <DetailRouteDiv>
            {
                Object.keys(boulders).map((key, index) => {
                    const nazevOblasti = boulders.nazevOblasti;
                    const boulder = boulders[key];
                    const nazevBloku = boulder.nazevBloku;
                    console.log(nazevBloku)
                    if (typeof (boulders[key]) === 'object') {
                        const cesty = boulders[key].cesty;
                        return (
                            <React.Fragment key={index}>
                                {
                                    Object.keys(cesty).map((key1) => {
                                        const cesta = cesty[key1];
                                        if (cesta.id === route) {
                                            return (
                                                <React.Fragment key={cesta.id}>
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
                                                        <ImageDiv>
                                                            {
                                                                cesta.img === "" ? (
                                                                    <Img src="https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/unknown%2FUnkownRock.png?alt=media&token=e51ad124-69b1-4de5-b345-1063e02cadff" alt={cesta.id} />

                                                                ) : (
                                                                    <Img src={cesta.img} alt={cesta.id} />
                                                                )
                                                            }
                                                        </ImageDiv>
                                                        <ReportModal />
                                                        <CommentComponent />
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
                <BackIcon /> Zpět na bloky
            </BackDiv>
        </DetailRouteDiv>
    )
}

export default DetailOfRoute
