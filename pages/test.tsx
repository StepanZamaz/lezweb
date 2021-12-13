import React , { useState, useEffect } from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import{auth} from "../utils/firebase"
const Test = () => {
    const[registerEmail, SetRegisterEmail] = useState("");
    const[registerPassword, SetRegisterPassword] = useState("");
    const register = async () =>{
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user.user.uid)
        }catch(error : any){
            console.log(error.message)
        }
        
    }
    return(
        <div>
            <div>
                <h3>Register</h3>
                <input 
                    placeholder="Email..." 
                    onChange={(event)=>{
                        SetRegisterEmail(event.target.value)
                    }}
                required>

                </input>
                <input 
                    placeholder="Password..."
                    onChange={(event)=>{
                        SetRegisterPassword(event.target.value)
                    }}
                required>

                </input>
                

                <button onClick={register}>CreateUser</button>
            </div>
        </div>
    )
}
export default Test;
