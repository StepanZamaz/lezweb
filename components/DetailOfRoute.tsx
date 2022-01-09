import { DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
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
    display: grid;
    grid-template-columns: 50% 45%;
    grid-template-rows: 15% 60% 15%;
    grid-gap: 5%;
    grid-template-areas: 
        "autor  rating"
        "describe describe"
        "material ."
    ;
`
const DetailRouteDiv = styled.div`
    min-height: 90vh;
`
const AutorDiv = styled.div`
    grid-area: autor;
`
const RatingDiv = styled.div`
    grid-area: rating;
`
const DescribeDiv = styled.div`
    grid-area: describe;
`
const MaterialDiv = styled.div`
    grid-area: material;
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
                                                            <div>autor: </div> 
                                                            <div>{cesta.autor}</div>
                                                        </AutorDiv>
                                                        <RatingDiv>
                                                            <div>hodnocení cesty: </div>  
                                                            <div>{cesta.hodnoceni}</div> 
                                                        </RatingDiv>
                                                        <DescribeDiv>
                                                            
                                                        <div>popis cesty: </div> 
                                                        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nullam eget nisl. Aliquam erat volutpat. Etiam neque. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Maecenas libero. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nulla non arcu lacinia neque faucibus fringilla. Mauris metus. Duis viverra diam non justo.</div> 
                                                        </DescribeDiv>
                                                        <MaterialDiv>
                                                            <div>materiál:</div> 
                                                            <div>žula</div> 
                                                        </MaterialDiv>
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
        </DetailRouteDiv>
    )
}

export default DetailOfRoute
