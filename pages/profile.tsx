import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { NextPage } from 'next';
import ProfileComponent from '../components/ProfileComponent'
const ProfileDiv = styled.div`
    display: flex;
    min-height: 84vh;
    height: 88vh;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/mladkov%2F4.JPG?alt=media&token=e5828824-aaa3-4178-b3d1-648fc382de4d);
    background-size: cover;
    padding-top: 100px;
    padding-bottom: 100px;
    align-items: center;
`
const ProfileContainter = styled.div`
    width: 40%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 50px;
    border: 2px solid black;
    background: rgba(255,255,255,0.15);
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
`
const profile: NextPage = () => {
    return (
        <>
            <Navbar />
            <ProfileDiv>
                <ProfileContainter>
                    <ProfileComponent/>
                </ProfileContainter>
            </ProfileDiv>
            <Footer />
        </>

    )
}

export default profile
