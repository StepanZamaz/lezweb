import { DocumentData } from '@firebase/firestore'
import Link from 'next/link'
import React, {useState} from 'react'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from "react-icons/fa" 
import styled from 'styled-components'
const Section = styled.section`
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Image = styled.img`
    width: 900px;
    height: 600px;
    border-radius: 10px;
`
const ArrowRight = styled(FaArrowAltCircleRight)`
    position: absolute;
    top: 50%;
    right: 32px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`
const ArrowLeft = styled(FaArrowAltCircleLeft)`
    position: absolute;
    top: 50%;
    left: 32px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`
const Slide = styled.div`
    opacity: 0;
    transition-duration: 1s ease;
`
const SlideActive = styled.div`
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
`


const ImageSlider = ({data}:DocumentData) => {
    const SliderData = new Array(data.length);
    console.log(SliderData)
    
    Object.keys(data).map((key,index)=>{
        const oblast = data[key];
        const asArray = Object.entries(oblast);
        const filtered = asArray.filter(([key,value]) => typeof value === 'object')
        const filteredObjects = Object.fromEntries(filtered);
        const values = Object.values(filteredObjects)
        const prop: any = values[Math.floor(Math.random() * values.length)];
        const cesty = prop.cesty;
        const values2 = Object.values(cesty);
        const cesta : any = values2[Math.floor(Math.random() * values2.length)];
        SliderData[index] = {nazev: data[key].nazevOblasti, image: cesta.img , id: oblast.id};
    })
    
    const[current, setCurrent] = useState(0);
    const length = SliderData.length;

    const nextSlide = () =>{
        setCurrent(current === length -1 ? 0 : current+1)
    }
    const prevSlide = () =>{
        setCurrent(current === 0 ? length -1 : current -1)
    }

    if(!Array.isArray(SliderData) || SliderData.length <= 0){
        return null
    }

    return (
        
        <Section>
            <ArrowLeft onClick={prevSlide}/>
            <ArrowRight onClick={nextSlide} />
            {
                SliderData.map((slide,index)=>{
                    return(
                        <React.Fragment key={index}>
                            {
                                index === current
                                ? <SlideActive>
                                    {index === current && (
                                        <div>
                                            <Link href="/[locations]" as={`/${slide.id}`} key={slide.id}>
                                                <h1>{slide.nazev}</h1>
                                            </Link>
                                            <Image src={slide.image} alt={slide.nazev}></Image>
                                        </div>
                                        
                                    )}
                                </SlideActive>
                                : <Slide>
                                    {index === current && (
                                        <div>
                                            <Link href="/[locations]" as={`/${slide.id}`} key={slide.id}>
                                                <h1>{slide.nazev}</h1>
                                            </Link>
                                            <Image src={slide.image} alt={slide.nazev}>neco</Image>
                                        </div>
                                        
                                    )}
                                </Slide>
                            }

                        </React.Fragment>
                        
                    )
                })
            }
        </Section>
    )
}
/*
{index === current && <SlideActive>
                                                    {index === current && 
                                                        <div>
                                                            <h1>aha</h1>
                                                            <Image src={slide.image} alt={slide.nazev}></Image>
                                                        </div>
                                                        }
                                                </SlideActive>
                            }
                            {
                                index != current && <Slide>
                                                        {index === current && 
                                                            <div>
                                                                <h1>neco</h1>
                                                                <Image src={slide.image} alt={slide.nazev}></Image>
                                                            </div>
                                                        }
                                                    </Slide>
                            }
*/
export default ImageSlider
