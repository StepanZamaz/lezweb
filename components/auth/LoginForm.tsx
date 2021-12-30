import React, { useState } from 'react'
import {Formik, Form, FormikProps} from "formik"
import {TextField} from '../TextField'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from '../../utils/firebase';
import Router from 'next/router'
import styled from 'styled-components';
import {FaInstagram}from 'react-icons/fa'
import Link from 'next/link';

const logo = require('../../public/logo.png');

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: rgba(255,255,255,0.15);
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.4rem;

`
const SignUpText = styled.h2`
    font-size: 2.5vw;
    margin: 3rem 0 2rem 0;
`
const FormFormik = styled(Form)`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    width: 100%;
`
const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0;
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`
const LoginButton = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 40%;
    height: 2.3vw;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`
const Register = styled.div`
    width: 90%;
    height: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const RegisterText = styled.p`
    font-size: 1vw;
`
const RegisterLink = styled.a`
    cursor: pointer;
    color: #61ed84;
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
    width: 30%;
    padding: 0rem 1rem;
`
const ClimberryText = styled.h3`
    width: 100%
    height: 20%;
`
export const LoginForm = () => {
    const[user, setUser] = useState<object|null>({});

    onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
        //@ts-ignore: Object is possibly 'null'
        if(user?.email){
            console.log("redirectToHome")
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
                    <SignUpText>Login</SignUpText>
                    <FormFormik>
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="Password" name="password" type="password" />
                        <ButtonContainer>
                            <LoginButton type="submit">Login</LoginButton>
                            <LoginButton type="reset">Reset</LoginButton>
                        </ButtonContainer>
                        <Register>
                                <RegisterText>Do you want to register?</RegisterText>
                                <Link href="/register">
                                    <RegisterLink>SignUp now</RegisterLink>
                                </Link>
                        </Register>
                    </FormFormik>
                    <ClimberryContainer>
                        <StyledImg src={logo.default.src} alt="Logo"></StyledImg>
                        <ClimberryText>Climberry</ClimberryText>
                    </ClimberryContainer>
                </>
            )
            }
        </Formik>
        </Container>
    )
}
