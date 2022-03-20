import React from 'react'
import {ErrorMessage, useField } from 'formik'
import styled from 'styled-components'
import { device } from '../styledComponents/device'
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 20%;
    padding: 1rem;
`

const StyledInput = styled.input`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 2px 2px 0 #61ed84;
    border-radius: 2rem;
    width: 60%;
    height: 100%;
    padding: 1rem;
    border: none;
    outline: none;
    color: #61ed84;
    font-size: 1rem;
    font-weight: bold;
    &:focus{
        display: inline-block;
        box-shadow: 0 0 0 0.2rem #61ed84;
        backdrop-filter: blur(12rem);
        border-radius: 2rem;
    }
    &::placeholder{
        color: #61ed84;
        font-weight: 100;
        font-size: 1rem;
    }
`
const StyledErrorMsg = styled.p`
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    @media ${device.laptop}{
        font-size: 1em;
    }
`
const AlignDiv = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
`
const TextFieldChangePS = ({label,...props}:any) => {
    const [field,meta] = useField(props);
    return (
        <>
            <InputMsgContainer>
                <AlignDiv/>
                <StyledInput placeholder={label}
                {...field} {...props}
                />
                <AlignDiv/>
            </InputMsgContainer>
            <ErrorMessage  component="div" name={field.name} >
                        {msg => (
                            <StyledErrorMsg>{msg}</StyledErrorMsg>
                        )}
            </ErrorMessage>
        </>  
    )
}

export default TextFieldChangePS
