import type { NextPage } from 'next'
import  Head  from 'next/head';
import React from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import {Hero} from '../components/styledComponents/styledComponents'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image'
const DisplayWhole = styled.div`
    height: 92%;
    background: #C3C3C1;
`
const Heading = styled.div`
    padding-top: 3%;
    height: 10%;
`
const Other = styled.div`
    margin-top: 3%;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    height: 65%;
    display: grid;
    grid-template-columns: 45% 45%;
    column-gap: 10%;
`
const HeadingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const BoulderHeading = styled.div`
    display: flex;
    width: 40%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #323232;
    border-radius: 20px;
    color: #61ed84;
    font-size: 2.5vw;
    font-weight: bold;
`
const DivAbout = styled.div`
    background-color: #323232;
    border-radius: 20px;
    
`
const DivImages = styled.div`
    background-color: #323232;
    border-radius: 20px;
`
const ImagesGallery = styled.div`
    margin-top: 2%;
    width: 90%;
    height: 80%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    grid-template-rows: 20% 20% 20% 20% ;
    column-gap: 6.6%;
    row-gap: 6.6%;
`
const DivText = styled.div`
    width: 100%;
    height: 10%;
    color: #61ed84;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
`
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`
const NextImage = styled(Image)`
  
`
const NextDiv = styled.div`
    height: 100%;
    width: 100%;
`
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout>
      <Navbar/>
      <DisplayWhole>
        <Heading>
            <HeadingDiv>
                <BoulderHeading>Boulderová aplikace pro lezce</BoulderHeading>
            </HeadingDiv>
        </Heading>
        <Other>
            <DivAbout>
              <DivText>
                O aplikaci
              </DivText>
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
      </DisplayWhole>
      <Footer/>
      </BasicLayout>
    </>
  )
}

export default Home;
/*
<img src="https://drive.google.com/uc?export=view&id=1x6Q1VRlyZrnzULRpqc7NJzwsx3xrCt8q" alt="1" />
*/