import type { NextPage } from 'next'
import Head from 'next/head';
import React, { useState } from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image'
import { MdExplore } from "react-icons/md"
import { GiFallingRocks } from "react-icons/gi"
import { FaMapMarkedAlt, FaUserCheck } from "react-icons/fa"
import { BiImageAdd } from "react-icons/bi"
import { device } from '../components/styledComponents/device'
const picture1 = require('../public/staticFoto/staticFoto_1.jpg');
const picture2 = require('../public/staticFoto/staticFoto_2.jpg');
const picture3 = require('../public/staticFoto/staticFoto_3.jpg');
const picture4 = require('../public/staticFoto/staticFoto_4.jpg');
const picture5 = require('../public/staticFoto/staticFoto_5.jpg');
const picture6 = require('../public/staticFoto/staticFoto_6.jpg');
const picture7 = require('../public/staticFoto/staticFoto_7.jpg');
const picture8 = require('../public/staticFoto/staticFoto_8.jpg');
const picture9 = require('../public/staticFoto/staticFoto_9.jpg');
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
        <title>Climberries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <DisplayWhole>
        <Heading>
          <HeadingDiv>Boulderov?? aplikace pro lezce</HeadingDiv>
        </Heading>
        <Other>
          <AboutDiv>
            <HeadingTextAbout>
              O aplikaci
            </HeadingTextAbout>
            <ContentDiv>
              <AboutLine>
                <IconApp />
                <DivText>Aplikace climberries je internetov?? pr??vodce lezeck??mi boulderov??mi oblastmi.</DivText>
              </AboutLine>
              <AboutLine>
                <DivText>Hlavn?? ????st?? t??to aplikace je proch??zen?? ji?? p??idan??ch oblast??. Oblasti jsou roz??len??ny na bloky a cesty.
                  U cest jsou uveden?? pot??ebn?? ??daje o cest?? (jako nap??. Autor, Hodnocen??, N??zev atd...).</DivText>
                <IconBoulder />
              </AboutLine>
              <AboutLine>
                <IconMap />
                <DivText>Dal???? ????st?? t??to aplikace je mapa, na kter?? se zobrazuj?? bloky v podob?? markeru. Marker se zobrazuje v m??st??, kde se blok nach??z??.
                  Po kliknut?? na marker se u??ivateli zobraz?? n??zev bloku, oblast ve kter?? blok je a cesty.</DivText>
              </AboutLine>
              <AboutLine>
                <DivText>V neposledn?? ??ad?? je tu mo??nost registrace. U??ivatel m?? mo??nost se zaregistrovat. Na sv??m profilu pot?? m????e prohl????et sv?? u??ivatelsk?? informace.
                  D??le je tu mo??nost m??nit sv?? ??daje.</DivText>
                <IconAuth />
              </AboutLine>
              <AboutLine>
                <IconAdd />
                <DivText>Posledn?? ????st?? pro registrovan?? u??ivatele je p??id??v??n?? informac?? do pr??vodce.
                  V profilov?? ????sti m?? ka??d?? u??ivatel mo??nost p??idat oblast, blok, cestu a data s t??m spojena.</DivText>
              </AboutLine>
            </ContentDiv>
          </AboutDiv>
          <ImageDiv>
            <HeadingText>
              Bouldery
            </HeadingText>
            <ContentDivImages>
              <Gallery>
                <StyledImg src={picture1.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture2.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture3.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture4.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture5.default.src}alt='boulder'></StyledImg>
                <StyledImg src={picture6.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture7.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture8.default.src} alt='boulder'></StyledImg>
                <StyledImg src={picture9.default.src} alt='boulder'></StyledImg>
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