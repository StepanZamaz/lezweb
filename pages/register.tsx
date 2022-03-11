import React from 'react'
import styled from 'styled-components';
import { RegisterForm } from '../components/auth/RegisterForm';
import { device } from '../components/styledComponents/device'
const picture1 = require('../public/staticFoto/1.JPG');
const Container = styled.div`
    background-image: url('${picture1.default.src}');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    border: solid 10px black;
    min-height: 100vh;
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
