import React, { useEffect, useState } from 'react'
import {Formik, Form, FormikProps} from "formik"
import {TextFieldAuth} from '../formikFields/TextFieldAuth'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../../utils/firebase';
import Router from 'next/router'
import styled from 'styled-components';
import Link from 'next/link';
import { device } from '../styledComponents/device'

const logo = require('../../public/logo.png');

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 900px;
    width: 650px;
    background: rgba(255,255,255,0.15);
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    @media (max-width: 1920px) { 
        height: 700px;
        width: 500px;
    }
    @media ${device.laptop}  {
        height: auto;
    }
`
const SignUpText = styled.h2`
    font-size: 2.5em;
    margin: 3rem 0 2rem 0;
    @media ${device.laptop}  {
        font-size: 2em;
        margin: 2rem 0 1rem 0;
    }
`
const FormFormik = styled(Form)`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 40%;
    width: 100%;
    @media (max-width: 1920px) { 
        height: 60%;
    }
`
const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0;
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    @media (max-width: 1920px) { 
        height: 80%;
    }
    @media ${device.laptop}  {
        height: 90px;
    }
`
const LoginButton = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 35%;
    height: 40%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    @media ${device.mobileM}  {
        font-size: 0.7em;
        width: 45%;
    }
`
const Register = styled.div`
    width: 90%;
    height: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const RegisterText = styled.p`
    font-size: 1.5em;
    margin-bottom: 2%;
    @media (max-width: 1920px) { 
        font-size: 1em;
    }
    @media ${device.laptop}  {
        font-size: 0.8em;
    }
    @media ${device.mobileM}  {
        font-size: 0.5em;
        font-weight: bold;
    }
`
const RegisterLink = styled.a`
    cursor: pointer;
    color: #61ed84;
    @media ${device.laptop}  {
        font-size: 1em;
    }
`
const ClimberryContainer = styled.div`
    height: 30%;
    margin-top: 5%;
    width: 80%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 2vw;
`
const StyledImg = styled.img`
    cursor: pointer;
    width: 30%;
    padding: 0rem 1rem;
    @media ${device.laptop}  {
        width: 25%;
        margin-bottom: 30px;
    }
`
const ClimberryText = styled.h3`
    font-size: 2.5rem;
    @media ${device.laptop}  {
        font-size: 2rem;
        margin-bottom: 30px;
    }
`
export const LoginForm = () => {
    const[user, setUser] = useState<object|null>({});

    
    onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
        // @ts-ignore
        if(user?.email){
            redirectToHome();
        }
    })
    const login = async (values:any) =>{
        try{
            const user = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log(user);
        }catch(error : any){
            console.log(error.message)
        }
    }
    const redirectToHome = () => Router.push({
        pathname: '/'
    });
    return (
        <Container>
            <Formik
            initialValues={{
                email:'',
                password:'',
            }}
            onSubmit={values =>{
                login(values);
                
            }}
        >
            {formik =>(
                <>
                    <SignUpText>Přihlášení</SignUpText>
                    <FormFormik>
                        <TextFieldAuth label="Email" name="email" type="email" />
                        <TextFieldAuth label="Password" name="password" type="password" />
                        <ButtonContainer>
                            <LoginButton type="submit">Přihlásit</LoginButton>
                            <LoginButton type="reset">Resetovat</LoginButton>
                        </ButtonContainer>
                        <Register>
                                <RegisterText>Chceš se zaregistrovat?</RegisterText>
                                <Link href="/register">
                                    <RegisterLink>Registrace</RegisterLink>
                                </Link>
                        </Register>
                    </FormFormik>
                    <ClimberryContainer>
                        <Link href="/">
                            <StyledImg src={logo.default.src} alt="Logo"></StyledImg>
                        </Link>
                        <ClimberryText>Climberry</ClimberryText>
                    </ClimberryContainer>
                </>
            )
            }
        </Formik>
        </Container>
    )
}
