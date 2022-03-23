import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../utils/firebase';
import {CgProfile} from "react-icons/cg"
import DropdownMenu from "./DropdownMenu"
import { device } from './styledComponents/device'
const logo = require('../public/logo.png');

const Nav = styled.nav`
    height: 125px;
    width: 100%;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media ${device.laptop} { 
        height: 200px;
        flex-direction: column;
        justify-content: space-around;
    }
    @media ${device.tablet} { 
        height: 150px;
    }
`
const StyledLink = styled.a`
    font-size: 2em;
    padding: 0rem 2rem;
    color: #61ed84;
    cursor: pointer;
    :hover {
        color: rgb(41, 153, 72);
    }
    @media ${device.tablet} { 
        font-size: 1.5em;
        padding: 0rem 1rem;
    }
    @media ${device.laptopL} { 
        font-size: 1.5em;
        padding: 0rem 1.5rem;
    }
    @media ${device.mobileL} {
        font-size: 1em;
    }
`
const StyledNadpis = styled.a`
    cursor: pointer;
    font-size: 5em;
    padding: 0rem 1rem;
    color: #61ed84;
    @media ${device.tablet} { 
        font-size: 3.5em;
    }
    @media ${device.mobileL} { 
        font-size: 2.5em;
        padding: 0rem 0.7rem;
    }
`
const StyledImg = styled.img`
    cursor: pointer;
    height: 5em;
    padding: 0rem 1rem;
    :hover {
        transition-duration: 1s;
        transform: scale(1.2);
    }
    @media ${device.tablet} { 
        height: 3.5em;
    }
    @media ${device.mobileL} { 
        height: 2.5em;
    }
`
const StyledProfileIcon = styled(CgProfile)`
    font-size: 3em;
    color: #61ed84;
    cursor: pointer;
    :hover {
        color: rgb(41, 153, 72);
    }
    @media ${device.tablet} { 
        font-size: 2.2em;
    }
`
const NavContent = styled.div`
    margin-right: 2%;
    display: flex;
    width: 25%;
    justify-content: space-around;
    align-items: center;
    @media ${device.laptop} { 
        width: 90%;
    }
`
const IcoDropDownDiv = styled.div`
    position: relative;
`
const Navbar = () => {
    const[user, setUser] = useState<User|null>();
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
                <Link href="/">
                    <StyledNadpis>Climberries</StyledNadpis>
                </Link>
            </div>
            
            <NavContent>
                <Link href="/listLoc">
                    <StyledLink>Oblasti</StyledLink> 
                </Link>
                <Link href="/map">
                    <StyledLink>Mapa</StyledLink>   
                </Link>
                {
                    user?.email === undefined
                    ? <Link href="/login">
                        <StyledLink>Přihlášení</StyledLink>   
                    </Link>
                    : 
                    <IcoDropDownDiv>
                        <StyledProfileIcon onClick={() => setOpen(!open)}/>
                        {open && 
                            <DropdownMenu/>
                        }
                    </IcoDropDownDiv>
                }
                
            </NavContent>
        </Nav>
    )
}

export default Navbar;