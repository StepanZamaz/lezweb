import React from 'react'
import styled from 'styled-components'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Link from 'next/link';
const Dropdown = styled.div`
    position: absolute;
    top: 10vh;
    width: 10vw;
    transform: translateX(+70%);
    background-color: #575756;
    border-top: 2px solid #101010;
    border-left: 2px solid #101010;
    border-right: 2px solid #101010;
    border-radius: 2%;
    overflow: hidden;
    z-index: +1;
`
const DropdownLine = styled.div`
    height: 25%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 2px solid #101010;
`
const Signout = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 100%;
    height: 1vw;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
`
const Profile = styled.a`
    width: 100%;
    height: 1vw;
    cursor: pointer;
    color: #000;
    background-color: #61ed84;
    border-radius: 2rem;
    font-weight: bold;
    text-transform: uppercase;
`
const DropdownMenu = () => {
    
    const logOut = async () =>{
        await signOut(auth);
    }
    return (
        <>
            <Dropdown>
                <DropdownLine>
                    <Link href="/profile">
                        <Profile>Profil</Profile>
                    </Link>
                </DropdownLine>
                <DropdownLine>
                    <Signout onClick={logOut}>Odhlásit</Signout>
                </DropdownLine>
            </Dropdown>
            
        </>
        
    )
}

export default DropdownMenu

