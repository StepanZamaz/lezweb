import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { NextPage } from 'next';
import ProfileComponent from '../components/ProfileComponent'
import { device } from '../components/styledComponents/device';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../utils/firebase';
import ReactLoading from 'react-loading';
const picture8 = require('../public/staticFoto/DSC_7229.JPG');
const ProfileDiv = styled.div`
    display: flex;
    min-height: 90vh;
    height: 90vh;
    background-image: url('${picture8.default.src}');
    background-size: cover;
    padding-top: 100px;
    padding-bottom: 100px;
    align-items: center;
    @media ${device.laptopL}{
        height: 850px;
    }
    @media ${device.tablet}{
        height: 700px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
`
const ProfileContainter = styled.div`
    width: 800px;
    height: 700px;
    margin-left: auto;
    margin-right: auto;
    padding: 50px;
    border: 2px solid black;
    background: rgba(255,255,255,0.15);
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
    @media ${device.tablet}{
        padding: 30px;
        padding-right: 0;
        height: 600px;
    }
    @media (max-width: 578px){
        padding-left: 5px;
    }
`
const CenterLoading = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 15%;
    background-color: #323232;
`
const Profile: NextPage = () => {
    const [user, setUser] = useState<User | null>();
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    if(user){
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
    else return(
        <CenterLoading>
            <ReactLoading type={'spokes'} color={"#61ed84"}  width={'20vw'}></ReactLoading>
        </CenterLoading>
    )
}

export default Profile
