import type { NextPage } from 'next'
import Head from 'next/head';
import React from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import { Hero } from '../components/styledComponents/styledComponents'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image'
import { MdExplore } from "react-icons/md"
import { GiFallingRocks } from "react-icons/gi"
import { FaMapMarkedAlt, FaUserCheck } from "react-icons/fa"
import { BiImageAdd } from "react-icons/bi"
import { device } from '../components/styledComponents/device'
const DisplayWhole = styled.div`
    display: flex;
    flex-direction: column;
    background: #C3C3C1;
    min-height: 90vh;
`
const Heading = styled.div`
    padding-top: 60px;
    height: 150px;
    display:flex;
    width: 100%;
    justify-content: center;
    @media ${device.tablet} { 
        padding-top: 40px;
        height: 100px;
    }
`
const HeadingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 100%;
    background-color: #323232;
    border-radius: 20px;
    color: #61ed84;
    font-size: 2.2em;
    font-weight: bold;
    @media ${device.tablet} { 
        height: 90%;
        width: 400px;
        font-size: 1.5em;
    }
    @media ${device.mobileL} {
        width: 250px;
        font-size: 1em;
    }
`
const Other = styled.div`
    margin-top: 6%;
    margin-bottom: 8%;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    flex-direction: row;
    @media ${device.laptop} { 
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: 50px;
    }
`
const AboutDiv = styled.div`
    width: 40%;
    height: 800px;
    background-color: #323232;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1920px) {
        height: 700px;
    }
    @media ${device.laptopL} { 
        height: 550px;
    }
    @media ${device.laptop} { 
        width: 80%;
        height: 650px;
    }
`
const ImageDiv = styled.div`
    width: 40%;
    height: 800px;
    background-color: #323232;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1920px) {
        height: 700px;
    }
    @media ${device.laptopL} { 
        height: 550px;
    }
    @media ${device.laptop} { 
        width: 80%;
        height: 680px;
    }
    @media ${device.tablet} {
        height: 1000px;
    }
    @media (max-width: 660px) {
        height: auto;
    }
    @media (max-width: 590px) {
        height: auto;
    }
`
const HeadingText = styled.div`
    width: 90%;
    height: 12%;
    color: #61ed84;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: 2px solid #61ed84;
    @media (max-width: 660px) {
      height: 100px;
    }
`
const HeadingTextAbout = styled.div`
    width: 90%;
    height: 12%;
    color: #61ed84;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: 2px solid #61ed84;
    @media (max-width: 660px) {
      height: 12%;
    }
`
const ContentDiv = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #61ed84;
`
const ContentDivImages = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #61ed84;
    @media ${device.tablet} {
        margin-top: 7%;
        height: auto;
    }
    @media (max-width: 660px) {
        height: auto;
        margin-top: 7%;
        margin-bottom: 7%;
    }
    @media (max-width: 590px) {
        margin-top: 7%;
        margin-bottom: 7%;
    }
`
const AboutLine = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    align-items: center;
`
const DivText = styled.div`
    width: 60%;
    @media ${device.laptopL} {
        font-size: 0.8em;
    }
    @media ${device.laptop} {
        font-size: 1em;
    }
    @media ${device.tablet} {
        font-size: 0.8em;
    }
    @media (max-width: 600px) {
        font-size: 0.6em;
    }
    
`
const IconApp = styled(MdExplore)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2.5em;
    }
    @media ${device.laptop} {
        font-size: 3em;
    }
    @media ${device.tablet} {
        font-size: 2.5em;
    }
`
const IconBoulder = styled(GiFallingRocks)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2.5em;
    }
    @media ${device.laptop} {
        font-size: 3em;
    }
    @media ${device.tablet} {
        font-size: 2.5em;
    }
`
const IconMap = styled(FaMapMarkedAlt)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2.5em;
    }
    @media ${device.laptop} {
        font-size: 3em;
    }
    @media ${device.tablet} {
        font-size: 2.5em;
    }
`
const IconAuth = styled(FaUserCheck)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2.5em;
    }
    @media ${device.laptop} {
        font-size: 3em;
    }
    @media ${device.tablet} {
        font-size: 2.5em;
    }
`
const IconAdd = styled(BiImageAdd)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2.5em;
    }
    @media ${device.laptop} {
        font-size: 3em;
    }
    @media ${device.tablet} {
        font-size: 2.5em;
    }
`
const Gallery = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    row-gap: 5%;
`
const StyledImg = styled.img`
    width: 27%;
    height: auto;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    @media ${device.laptop} { 
        width: 30%;
    }
    @media ${device.tablet} {
        width: 38%;
    }
    @media (max-width: 660px) {
        width: 70%;
    }
`
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <DisplayWhole>
        <Heading>
          <HeadingDiv>Boulderová aplikace pro lezce</HeadingDiv>
        </Heading>
        <Other>
          <AboutDiv>
              <HeadingTextAbout>
                O aplikaci
              </HeadingTextAbout>
              <ContentDiv>
                <AboutLine>
                  <IconApp />
                  <DivText>Aplikace climberries je internetový průvodce lezeckými boulderovými oblastmi.</DivText>
                </AboutLine>
                <AboutLine>
                  <DivText>Hlavní částí této aplikace je procházení již přidaných oblastí. Oblasti jsou rozčleněny na bloky a cesty.
                    U cest jsou uvedené potřebné údaje o cestě (jako např. Autor, Hodnocení, Název atd...).</DivText>
                  <IconBoulder />
                </AboutLine>
                <AboutLine>
                  <IconMap />
                  <DivText>Další částí této aplikace je mapa, na které se zobrazují bloky v podobě markeru. Marker se zobrazuje v místě, kde se blok nachází.
                    Po kliknutí na marker se uživateli zobrazí název bloku, oblast ve které blok je a cesty.</DivText>
                </AboutLine>
                <AboutLine>
                  <DivText>V neposlední řadě je tu možnost registrace. Uživatel má možnost se zaregistrovat. Na svém profilu poté může prohlížet své uživatelské informace.
                    Dále je tu možnost měnit své údaje.</DivText>
                  <IconAuth />
                </AboutLine>
                <AboutLine>
                  <IconAdd />
                  <DivText>Poslední částí pro registrované uživatele je přidávání informací do průvodce.
                     V profilové části má každý uživatel možnost přidat oblast, blok, cestu a data s tím spojena.</DivText>
                </AboutLine>
              </ContentDiv>
          </AboutDiv>
          <ImageDiv>
              <HeadingText>
                Bouldery
              </HeadingText>
              <ContentDivImages>
                <Gallery>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2F6.JPG?alt=media&token=7d307522-ad17-4ebc-85a1-7380fcb4af47' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2F1.JPG?alt=media&token=0fddd20a-09b3-4ae4-b6e1-5ebc525cba93' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_6953.JPG?alt=media&token=2a2a9c7a-1f3f-47be-af1d-8abe0cca2e23' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7219.JPG?alt=media&token=c5ac6455-e72f-4ce1-9771-56ce6c1c315b' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_6992.JPG?alt=media&token=7441c82c-5cbe-41f5-bd55-8bef2288a5cf' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7229.JPG?alt=media&token=0a6338d2-b7b0-4d87-8c64-da8b0b55cb3f' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7000.JPG?alt=media&token=4e80de32-35db-45c1-9a4e-3bb9fb182d04' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7240.JPG?alt=media&token=8a5752bb-9efe-47f8-a219-99fabeea487e' alt='boulder'></StyledImg>
                  <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7001.JPG?alt=media&token=a916dc8c-c67c-43a4-a763-dbaa78b0710c' alt='boulder'></StyledImg>
                </Gallery>
              </ContentDivImages>
          </ImageDiv>
        </Other>
      </DisplayWhole>
      <Footer />
    </>
  )
}

export default Home;
/*
<img src="https://drive.google.com/uc?export=view&id=1x6Q1VRlyZrnzULRpqc7NJzwsx3xrCt8q" alt="1" />
*/
/*
<Other>
            <DivAbout>
              <DivText>
                O aplikaci
              </DivText>
              <AboutDivText>
                <TextAboutDiv>
                  <IconApp />
                  <TextAbout>
                    Aplikace climberries je internetový průvodce lezeckými boulderovými oblastmi.
                  </TextAbout>
                </TextAboutDiv>
                <TextAboutDiv>
                  <TextAbout>
                    Hlavní částí této aplikace je procházení již přidaných oblastí. Oblasti jsou rozčleněny na bloky a cesty.
                    U cest jsou uvedené potřebné údaje o cestě (jako např. Autor, Hodnocení, Název atd...).
                  </TextAbout>
                  <IconBoulder />
                </TextAboutDiv>
                <TextAboutDiv>
                  <IconMap />
                  <TextAbout>
                    Další částí této aplikace je mapa, na které se zobrazují bloky v podobě markeru. Marker se zobrazuje v místě, kde se blok nachází.
                    Po kliknutí na marker se uživateli zobrazí název bloku, oblast ve které blok je a cesty.
                  </TextAbout>
                </TextAboutDiv>
                <TextAboutDiv>
                  
                  <TextAbout>
                    V neposlední řadě je tu možnost registrace. Uživatel má možnost se zaregistrovat. Na svém profilu poté může prohlížet své uživatelské informace.
                    Dále je tu možnost měnit své údaje.
                  </TextAbout>
                  <IconAuth />
                </TextAboutDiv>
                <TextAboutDiv>
                  <IconAdd />
                  <TextAbout>
                    Poslední částí pro registrované uživatele je přidávání informací do průvodce. V profilové části má každý uživatel možnost přidat oblast, blok, cestu a data s tím spojena.
                  </TextAbout>
                </TextAboutDiv>
              </AboutDivText>
            </DivAbout>
            <DivImages>
              <DivText>
                Bouldery
              </DivText>
              <ImagesGallery>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2F6.JPG?alt=media&token=7d307522-ad17-4ebc-85a1-7380fcb4af47' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2F1.JPG?alt=media&token=0fddd20a-09b3-4ae4-b6e1-5ebc525cba93' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_6953.JPG?alt=media&token=2a2a9c7a-1f3f-47be-af1d-8abe0cca2e23' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7219.JPG?alt=media&token=c5ac6455-e72f-4ce1-9771-56ce6c1c315b' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_6992.JPG?alt=media&token=7441c82c-5cbe-41f5-bd55-8bef2288a5cf' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7229.JPG?alt=media&token=0a6338d2-b7b0-4d87-8c64-da8b0b55cb3f' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7000.JPG?alt=media&token=4e80de32-35db-45c1-9a4e-3bb9fb182d04' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7240.JPG?alt=media&token=8a5752bb-9efe-47f8-a219-99fabeea487e' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7001.JPG?alt=media&token=a916dc8c-c67c-43a4-a763-dbaa78b0710c' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7283.JPG?alt=media&token=a3203d17-99d7-495c-851a-3bd28c32833f' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7018.JPG?alt=media&token=1567e4b7-e0e5-41c4-a3bb-a1c376bd2e97' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7297.JPG?alt=media&token=b0a1201a-346e-4287-ae22-cfa0437b0c6d' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7053.JPG?alt=media&token=811c2db2-e0cb-4462-a1c5-cdf24a4f2070' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7303.JPG?alt=media&token=2c6f671f-fc31-43b6-a11a-441d72e53089' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7080.JPG?alt=media&token=01eb51ca-c237-4768-ae60-a5cc65797c25' alt='boulder'></StyledImg>
                <StyledImg src='https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/boulderFotoForGallery%2FDSC_7252.JPG?alt=media&token=6d137e0d-c724-4141-b9d6-6642fb8343f8' alt='boulder'></StyledImg>
              </ImagesGallery>
            </DivImages>
          </Other>

const Other = styled.div`
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    height: 70%;
    display: grid;
    grid-template-columns: 45% 45%;
    column-gap: 10%;
    @media ${device.laptop} {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
`
const DivAbout = styled.div`
    background-color: #323232;
    border-radius: 20px;
`
const DivImages = styled.div`
    background-color: #323232;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ImagesGallery = styled.div`
    margin-top: 2%;
    width: 90%;
    height: 80%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    column-gap: 4%;
`

const StyledImg = styled.img`
    width: 100%;
    height: auto;
`
const NextImage = styled(Image)`
  
` 
const NextDiv = styled.div`
    height: 100%;
    width: 100%;
`
const AboutDivText = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    color: #61ed84;
`
const TextAboutDiv = styled.div`
  height: 15%;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid #61ed84; 
`const IconApp = styled(MdExplore)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2em;
    }
`
const IconBoulder = styled(GiFallingRocks)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2em;
    }
`
const IconMap = styled(FaMapMarkedAlt)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2em;
    }
`
const IconAuth = styled(FaUserCheck)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2em;
    }
`
const IconAdd = styled(BiImageAdd)`
    width: 20%;
    font-size: 3em;
    @media ${device.laptopL} {
        font-size: 2em;
    }
`
const TextAbout = styled.p`
  width: 75%;
  font-size: 1.2em;
  @media ${device.desktopL} {
    font-size: 0.8em;
  }
  @media ${device.laptopL} {
    font-size: 0.6em;
  }
`
*/