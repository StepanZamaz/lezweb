import React from 'react'
import styled from 'styled-components'

const FooterSection = styled.div`
    background: #000;
    color: #fff;
    position: absolute;
    right: 0;
    left: 0;
    padding: 1rem;
    text-align: center;
`

const Footer = () => {
    return (
        <FooterSection>
            Ahoj zatim sem nic nemam
        </FooterSection>
    )
}

export default Footer
