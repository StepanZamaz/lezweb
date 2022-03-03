import { DocumentData } from '@firebase/firestore'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa"
import styled from 'styled-components'
import { device } from './styledComponents/device'
const Section = styled.section`
    position: relative;
    height: 88vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${device.laptopL} { 
        height: 83vh;
    }
    @media ${device.tablet} {
        height: 75vh;
    }
    @media ${device.mobileM} {
        height: 70vh;
    }
`
const Image = styled.img`
    cursor: pointer;
    width: 900px;
    height: auto;
    border-radius: 10px;
    @media ${device.laptopL} { 
        width: 700px;
    }
    @media (max-width: 950px)  { 
        width: 550px;
    }
    @media ${device.tablet} { 
        width: 400px;
    }
    @media (max-width: 470px) { 
        width: 300px;
    }
    @media ${device.mobileM} { 
        width: 250px;
    }
`
const ArrowRight = styled(FaArrowAltCircleRight)`
    position: absolute;
    top: 50%;
    right: 32px;
    font-size: 3rem;
    color: #323232;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`
const ArrowLeft = styled(FaArrowAltCircleLeft)`
    position: absolute;
    top: 50%;
    left: 32px;
    font-size: 3rem;
    color: #323232;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`
const Slide = styled.div`
    opacity: 0;
    //transition: opacity 0 1s ease;
    transition-duration: opacity 1s ease 2s;
`
const SlideActive = styled.div`
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.1);
`
const SlideNazev = styled.h1`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2.5rem;
    text-transform: uppercase;
    margin-bottom: 0.5%;
    color: #323232;
    @media ${device.laptopL} {
        font-size: 2.2rem;
    }
    @media (max-width: 950px)  {
        font-size: 1.8rem;
    }
    @media ${device.tablet} {
        font-size: 1.6rem;
    }
    @media ${device.mobileM} { 
        font-size: 1.2rem;
    }
`

const ImageSlider = ({ data }: DocumentData) => {
    const SliderData = new Array(data.length);

    Object.keys(data).map((key, index) => {
        const oblast = data[key];
        const asArray = Object.entries(oblast);
        const filtered = asArray.filter(([key, value]) => typeof value === 'object')
        if (Array.isArray(filtered) && filtered.length) {
            const filteredObjects = Object.fromEntries(filtered);
            const values = Object.values(filteredObjects)
            const prop: any = values[Math.floor(Math.random() * values.length)];
            const cesty = prop.cesty;
            if (Object.keys(cesty).length == 0) {
                SliderData[index] = { nazev: data[key].nazevOblasti, image: "https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/unknown%2FUnkownRock.png?alt=media&token=e51ad124-69b1-4de5-b345-1063e02cadff", id: oblast.id }
            }
            else {
                const values2 = Object.values(cesty);
                const cesta: any = values2[Math.floor(Math.random() * values2.length)];
                if (cesta.img == "") {
                    SliderData[index] = { nazev: data[key].nazevOblasti, image: "https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/unknown%2FUnkownRock.png?alt=media&token=e51ad124-69b1-4de5-b345-1063e02cadff", id: oblast.id }
                }
                else {
                    SliderData[index] = { nazev: data[key].nazevOblasti, image: cesta.img, id: oblast.id };
                }
            }
        }
        else SliderData[index] = { nazev: data[key].nazevOblasti, image: "https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/unknown%2FUnkownRock.png?alt=media&token=e51ad124-69b1-4de5-b345-1063e02cadff", id: oblast.id }
    })

    const [current, setCurrent] = useState(0);
    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null
    }

    return (
        <Section>
            <ArrowLeft onClick={prevSlide} />
            <ArrowRight onClick={nextSlide} />
            {
                SliderData.map((slide, index) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                index === current ?
                                (<SlideActive >
                                   {console.log("slideActive")}
                                   {index === current && (
                                       <>
                                           <Link href="/listLoc/[locations]" as={`/listLoc/${slide.id}`} key={slide.nazev}>
                                               <SlideNazev>{slide.nazev}</SlideNazev>
                                           </Link>
                                           <Link href="/listLoc/[locations]" as={`/listLoc/${slide.id}`} key={slide.id}>
                                                <Image src={slide.image} alt={slide.nazev}></Image>
                                           </Link>
                                       </>
                                   )}
                               </SlideActive>
                               ): (
                                   <>
                                   {console.log("neco")}
                                   <Slide/>
                               </>
                               )
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

/* 
index === current ?
                                     (<SlideActive >
                                        {console.log("slideActive")}
                                        {index === current && (
                                            <>
                                                
                                                <Link href="/listLoc/[locations]" as={`/listLoc/${slide.id}`} key={slide.nazev}>
                                                    <SlideNazev>{slide.nazev}</SlideNazev>
                                                </Link>
                                                <Link href="/listLoc/[locations]" as={`/listLoc/${slide.id}`} key={slide.id}>
                                                    <Image src={slide.image} alt={slide.nazev}></Image>
                                                </Link>
                                            </>
                                        )}
                                    </SlideActive>
                                    ): (
                                        <>
                                        {console.log("neco")}
                                        <Slide/>
                                    </>
                                    )
*/
