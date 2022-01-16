import React from 'react'
import styled from 'styled-components'
const logo = require('../public/logo.png');
const FooterSection = styled.div`
    background: #000;
    color: #fff;
    position: absolute;
    right: 0;
    left: 0;
    padding: 0.5rem;
    text-align: center;
    height: 6vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const ClimberryDiv = styled.div`
    width: 10%;
    color: #61ed84;
    font-size: 1.6rem;
`
const FooterDiv = styled.div`
    color: #61ed84;
    font-size: 0.8rem;
    width: 10%;
`
const StyledImg = styled.img`
    cursor: pointer;
    height: 2.5em;
    padding: 0rem 1rem;
    :hover {
        transition-duration: 1s;
        transform: scale(1.2);
    }
`
const LogoDiv = styled.div`
    width: 10%;
`
const Footer = () => {
    return (
        <FooterSection>
            <LogoDiv>
                <StyledImg src={logo.default.src}/>
            </LogoDiv>
            <ClimberryDiv>
                Climberries
            </ClimberryDiv>
            <FooterDiv>
                Projekt - DELTA - SŠIE, s.r.o. 
            </FooterDiv>
        </FooterSection>
    )
}

export default Footer
