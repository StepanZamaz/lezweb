import React , { useState, useEffect } from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import{auth} from "../../utils/firebase"
import db from "../../utils/firebase"; 
import Router from 'next/router'
import {Formik, Form} from "formik"
import {TextField} from '../TextField'
import * as Yup from 'yup'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
export const RegisterForm = () => {
    //const[userUID, setUserUID] = useState<string>("");
    const register = async (values:any) =>{
        try{
            const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
            if(user.user.uid.length > 0){
                AddData(values, user.user.uid);
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
                //console.log("xxx",userUID, "xxx");
                //AddData(values);
            }}
        >
            {formik =>(
                <div>
                    <h1>Register</h1>
                    <Form>
                        <TextField label="First Name" name="firstName" type="text" />
                        <TextField label="Last Name" name="lastName" type="text" />
                        <TextField label="Nickname" name="nickname" type="text" />
                        <TextField label="Email" name="email" type="emailt" />
                        <TextField label="Password" name="password" type="password" />
                        <TextField label="Confirm Password" name="confirmPassword" type="password" />
                        <button type="submit">Register</button>
                        <button type="reset">Reset</button>
                    </Form>
                </div>
            )
            }
        </Formik>
    )
}
