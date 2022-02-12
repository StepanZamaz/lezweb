import React , { useState, useEffect } from 'react'
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import{auth} from "../../utils/firebase"
import db from "../../utils/firebase"; 
import Router from 'next/router'
import {Formik, Form} from "formik"
import {TextFieldAuth} from '../formikFields/TextFieldAuth'
import * as Yup from 'yup'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components';
import Link from 'next/link';
import {HiOutlineLogin} from "react-icons/hi"
import TextFieldAdding from '../formikFields/TextFieldAdding';
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
    margin: 2rem 0 1rem 0;
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
    margin: 1rem 0 1rem 0;
    width: 100%;
    height: 50vh;
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
    height: 40%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`
const BackLogContainer = styled.div`
    height: 10%;
    position: relative;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`
const LoginLink = styled.a`
    cursor: pointer;
    color: #61ed84;
`
const StyledIconLogin = styled(HiOutlineLogin)`
    cursor: pointer;
    font-size: 2rem;
`
export const RegisterForm = () => {
    const[user, setUser] = useState<object|null>({});

    onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
        // @ts-ignore
        if(user?.email){
            redirectToHome();
        }
    })
    const redirectToHome = () => Router.push({
        pathname: '/'
    });

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
                admin: false,
                uid: userUID,
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
        firstName: Yup.string().max(15,"Maximálně 15 znaků").required('Vyžadováno'),
        lastName: Yup.string().max(20,"Maximálně 20 znaků").required('Vyžadováno'),
        nickname: Yup.string().max(15,"Maximálně 15 znaků").required('Vyžadováno'),
        email: Yup.string().email("Email je neplatný").required('Vyžadováno'),
        password: Yup.string().min(6,"Nejméně 6 znaků").required('Vyžadováno'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Hesla se neshodují').required('Vyžadováno'),
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
                        <SignUpText>Registrace</SignUpText>
                        <FormFormik>
                            <TextFieldAuth label="First Name" name="firstName" type="text" />
                            <TextFieldAuth label="Last Name" name="lastName" type="text" />
                            <TextFieldAuth label="Nickname" name="nickname" type="text" />
                            <TextFieldAuth label="Email" name="email" type="emailt" />
                            <TextFieldAuth label="Password" name="password" type="password" />
                            <TextFieldAuth label="Confirm Password" name="confirmPassword" type="password" />
                            <ButtonContainer>
                                <LoginButton type="submit">Registrovat</LoginButton>
                                <LoginButton type="reset">Resetovat</LoginButton>
                            </ButtonContainer>
                        </FormFormik>
                        <BackLogContainer>
                            <Link href="/login">
                                <StyledIconLogin/>
                            </Link>
                            <Link href="/login">
                                <LoginLink>Zpět na přihlášení</LoginLink>
                            </Link>
                        </BackLogContainer>
                    </>
                )
                }
            </Formik>
        </Container>
    )
}
