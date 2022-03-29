import React, {  useState } from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from '../utils/firebase';
import { LoginForm } from '../components/auth/LoginForm';
import { device } from '../components/styledComponents/device'
const picture1 = require('../public/staticFoto/1.JPG');
const Container = styled.div`
    background-image: url('${picture1.default.src}');
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
