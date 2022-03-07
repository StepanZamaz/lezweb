import React from 'react'
import styled from 'styled-components';
import { RegisterForm } from '../components/auth/RegisterForm';
import { device } from '../components/styledComponents/device'
const Container = styled.div`
    background-image: url(https://firebasestorage.googleapis.com/v0/b/lezweb.appspot.com/o/mladkov%2F1.JPG?alt=media&token=52bdec4b-cd32-4196-a543-0fc4b4b3c225);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    border: solid 10px black;
    @media (max-width: 1920px)  {
        height: auto;
        border: solid 5px black;
        padding-bottom: 5%;
    }
    @media (max-width: 1920px)  {
        border: solid 2px black;
    }
`

const Register = () => {
    return (
        <Container>
            <RegisterForm/>
        </Container>
    )
}

export default Register;
