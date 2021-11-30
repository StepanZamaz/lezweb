import React, {  useState } from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import {Hero, Heading} from '../components/styledComponents/styledComponents'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from '../utils/firebase';
const Login = () => {

    const[loginEmail, SetLoginEmail] = useState("");
    const[loginPassword, SetLoginPassword] = useState("");

    const[user, setUser] = useState<object|null>({});

    onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
    })

    const login = async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        }catch(error : any){
            console.log(error.message)
        }
    }

    const logOut = async () =>{

        await signOut(auth);
    }

    return (
        <>
            <BasicLayout>
                <Hero>
                    <div>
                        <div>
                            <h3>Login</h3>
                            <input 
                                placeholder="Email..."
                                onChange={(event)=>{
                                    SetLoginEmail(event.target.value)
                                }}
                            required>

                            </input>
                            <input 
                                placeholder="Password..."
                                onChange={(event)=>{
                                SetLoginPassword(event.target.value)
                            }}
                            required>

                            </input>

                            <button onClick={login}>Login</button>
                        </div>
                        <h4>User signed in: </h4>
                        {
                        //@ts-ignore: Object is possibly 'null'
                        user?.email
                        }
                        <button onClick={logOut}>Sign out</button>
                    </div>
                </Hero>
            </BasicLayout>   
        </>
    )
}

export default Login;
