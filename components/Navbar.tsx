import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

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
                <Link href="/login">
                    <StyledLink>Login</StyledLink>   
                </Link>
            </div>
        </Nav>
    )
}

export default Navbar
