import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../utils/firebase';

const logo = require('../public/logo.png');

const Nav = styled.nav`
    height: 15vh;
    width: 100%;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledLink = styled.a`
    font-size: 1.5em;
    padding: 0rem 2rem;
    color: #61ed84;
`
const StyledNadpis = styled.a`
    font-size: 5em;
    padding: 0rem 1rem;
    color: #61ed84;
`
const StyledImg = styled.img`
    height: 5em;
    padding: 0rem 1rem;
`

const Navbar = () => {
    const[user, setUser] = useState<object|null>({});

    onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
    })
    const logOut = async () =>{
        await signOut(auth);
    }
    return (
        <Nav>
            <div>
                <Link href="/">
                    <StyledImg src={logo.default.src} alt="Logo"/>
                </Link>
                <StyledNadpis>Climberry</StyledNadpis>
            </div>
            
            <div>
                <Link href="/listLoc">
                    <StyledLink>Oblasti</StyledLink> 
                </Link>
                <Link href="/map">
                    <StyledLink>Mapa</StyledLink>   
                </Link>
                {
                    //@ts-ignore: Object is possibly 'null'
                    user?.email === undefined
                    ? <Link href="/login">
                        <StyledLink>Login</StyledLink>   
                    </Link>
                    //@ts-ignore: Object is possibly 'null'
                    : <button onClick={logOut}>Sign out</button>
                }
                
            </div>
        </Nav>
    )
}

export default Navbar
