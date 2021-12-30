import type { NextPage } from 'next'
import  Head  from 'next/head';
import React from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import {Hero, Heading} from '../components/styledComponents/styledComponents'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 //https://coolors.co/4a4c3f-88736d-588e2b-030301
/*const Hero = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const Heading = styled.h1`
  color: #000;
  font-size: 5rem;
  font-weight: 900;
`;*/
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout>
      <Navbar/>
        <Hero>
          <Heading>Boulderova aplikace pro lezce</Heading>
        </Hero>
      <Footer/>
      </BasicLayout>
    </>
  )
}

export default Home;