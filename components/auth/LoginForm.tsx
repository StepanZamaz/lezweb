import React, { useState } from 'react'
import {Formik, Form, FormikProps} from "formik"
import {TextField} from '../TextField'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from '../../utils/firebase';
import Router from 'next/router'
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
    const redirectToRegister = () => Router.push({
        pathname: '/register'
    });
    const redirectToHome = () => Router.push({
        pathname: '/'
    });
    return (
        <div>
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
                <div>
                    <h1>Sign up</h1>
                    <Form>
                        <TextField label="Email" name="email" type="emailt" />
                        <TextField label="Password" name="password" type="password" />
                        <button type="submit">Login</button>
                        <button type="reset">Reset</button>
                        <button onClick={redirectToRegister}>Register</button>
                    </Form>
                </div>
            )
            }
        </Formik>
        </div>
    )
}
