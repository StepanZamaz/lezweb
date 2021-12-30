import React , { useState, useEffect } from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import{auth} from "../../utils/firebase"
import db from "../../utils/firebase"; 
import Router from 'next/router'
import {Formik, Form} from "formik"
import {TextField} from '../TextField'
import * as Yup from 'yup'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components';
import Link from 'next/link';
import {HiOutlineLogin} from "react-icons/hi"
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 90vh;
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
    height: 70%;
    width: 100%;
`
const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0;
    width: 100%;
    height: 20%;
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
const BackLogContainer = styled.div`
    height: 15%;
    position: relative;
    width: 100%;
    text-align: center;
`
const LoginLink = styled.a`
    cursor: pointer;
    color: #61ed84;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const StyledIconLogin = styled(HiOutlineLogin)`
    margin-top: 5%;
    cursor: pointer;
    font-size: 2rem;
`
export const RegisterForm = () => {
    const redirectToLogin = () => Router.push({
        pathname: '/login'
    });
    const register = async (values:any) =>{
        try{
            const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
            if(user.user.uid.length > 0){
                AddData(values, user.user.uid);
                redirectToLogin();
            }
        }catch(error : any){
            console.log(error.message)
        }
        
    }
    const AddData = async (values:any, userUID : string) =>{
        try {
            const docRef = await addDoc(collection(db, "users"), {
                id: userUID,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                nickname: values.nickname,
            });
          
            console.log("Document written with ID: ", userUID);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    const validate = Yup.object({
        firstName: Yup.string().max(15,"Must be 15 character or less").required('Required'),
        lastName: Yup.string().max(20,"Must be 20 character or less").required('Required'),
        nickname: Yup.string().max(15,"Must be 15 character or less").required('Required'),
        email: Yup.string().email("Email is invalid").required('Required'),
        password: Yup.string().min(6,"Password must be at least 6 characters").required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Password must match').required('Required'),
    })
    return (
        <Container>
            <Formik
                initialValues={{
                    firstName:'',
                    lastName:'',
                    nickname:'',
                    email:'',
                    password:'',
                    confirmPassword:''
                }}
                validationSchema={validate}
                onSubmit={values =>{
                    register(values);
                }}
            >
                {formik =>(
                    <>
                        <SignUpText>Register</SignUpText>
                        <FormFormik>
                            <TextField label="First Name" name="firstName" type="text" />
                            <TextField label="Last Name" name="lastName" type="text" />
                            <TextField label="Nickname" name="nickname" type="text" />
                            <TextField label="Email" name="email" type="emailt" />
                            <TextField label="Password" name="password" type="password" />
                            <TextField label="Confirm Password" name="confirmPassword" type="password" />
                            <ButtonContainer>
                                <LoginButton type="submit">Register</LoginButton>
                                <LoginButton type="reset">Reset</LoginButton>
                            </ButtonContainer>
                        </FormFormik>
                        <BackLogContainer>
                            <Link href="/login">
                                <StyledIconLogin/>
                            </Link>
                            <Link href="/login">
                                <LoginLink>Back to login</LoginLink>
                            </Link>
                        </BackLogContainer>
                    </>
                )
                }
            </Formik>
        </Container>
    )
}
