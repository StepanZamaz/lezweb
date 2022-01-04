import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../utils/firebase';
import {CgProfile} from "react-icons/cg"
import DropdownMenu from "./DropdownMenu"

const logo = require('../public/logo.png');

const Nav = styled.nav`
    height: 12vh;
    width: 100%;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledLink = styled.a`
    font-size: 2em;
    padding: 0rem 2rem;
    color: #61ed84;
    cursor: pointer;
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
const StyledProfileIcon = styled(CgProfile)`
    font-size: 3em;
    color: #61ed84;
    cursor: pointer;
`
const NavContent = styled.div`
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
`
const Navbar = () => {
    const[user, setUser] = useState<object|null>({});
    const [open, setOpen] = useState(false);
    onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
    })
    
    return (
        <Nav>
            <div>
                <Link href="/">
                    <StyledImg src={logo.default.src} alt="Logo"/>
                </Link>
                <StyledNadpis>Climberry</StyledNadpis>
            </div>
            
            <NavContent>
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
                        <StyledLink>Přihlášení</StyledLink>   
                    </Link>
                    //@ts-ignore: Object is possibly 'null'
                    : 
                    <>
                        <StyledProfileIcon onClick={() => setOpen(!open)}/>
                        {open && 
                            <DropdownMenu/>
                        }
                    </>
                }
                
            </NavContent>
        </Nav>
    )
}

export default Navbar;
