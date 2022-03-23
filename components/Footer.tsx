import React from 'react'
import styled from 'styled-components'
import { device } from './styledComponents/device'
import Link from 'next/link';
const logo = require('../public/logo.png');
const FooterSection = styled.div`
    background: #000;
    color: #fff;
    position: relative;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0.6rem;
    text-align: center;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media ${device.mobileL} { 
        flex-direction: column;
        height: 110px;
        align-content: space-around;
        padding: 0.8rem;
    }
`
const ClimberryDiv = styled.div`
    cursor: pointer;
    width: 20%;
    color: #61ed84;
    font-size: 1.6rem;
    :hover {
        transition-duration: 1s;
        transform: scale(1.2);
    }
    @media ${device.tablet} { 
        font-size: 1rem;
    }
    @media ${device.mobileL} { 
        width: 100%;
    }
`
const FooterDiv = styled.div`
    color: #61ed84;
    font-size: 0.8rem;
    width: 10%;
    @media ${device.tablet} { 
        font-size: 0.6rem;
    }
    @media ${device.mobileL} { 
        width: 100%;
    }
`
const StyledImg = styled.img`
    cursor: pointer;
    height: 2.5em;
    padding: 0rem 1rem;
    :hover {
        transition-duration: 1s;
        transform: scale(1.2);
    }
    @media ${device.tablet} { 
        height: 2em;;
    }
    
`
const LogoDiv = styled.div`
    width: 10%;
    @media ${device.mobileL} { 
        width: 100%;
    }
`
const StyledHyperText = styled.a`
    color: #61ed84;
    text-decoration: none;
`
const Footer = () => {
    return (
        <FooterSection>
            <LogoDiv>
                <Link href="/">
                    <StyledImg src={logo.default.src}/>
                </Link>
            </LogoDiv>
            <Link href="/">
                <ClimberryDiv>
                    Climberries
                </ClimberryDiv>
            </Link>
            <FooterDiv>
                <StyledHyperText href="https://www.delta-skola.cz/">Projekt - DELTA - SŠIE, s.r.o.</StyledHyperText>  
            </FooterDiv>
        </FooterSection>
    )
}

export default Footer
