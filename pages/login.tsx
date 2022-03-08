import React, {  useState } from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import {Hero, Heading} from '../components/styledComponents/styledComponents'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from '../utils/firebase';
import { LoginForm } from '../components/auth/LoginForm';
import { device } from '../components/styledComponents/device'

const Container = styled.div`
    background-image: url(https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/mladkov%2F1.JPG?alt=media&token=52bdec4b-cd32-4196-a543-0fc4b4b3c225);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    height: 100vh;
    width: 100vw;
    border: solid 10px black;
    @media ${device.laptop}  {
        border: solid 5px black;
    }
    @media ${device.mobileL}  {
        border: solid 2px black;
    }
`

const Login = () => {
    return(
        <Container>
            <LoginForm/>
        </Container>
    )
}
export default Login;
