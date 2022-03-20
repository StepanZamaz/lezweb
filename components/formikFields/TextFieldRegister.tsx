import React from 'react'
import {ErrorMessage, useField } from 'formik'
import styled from 'styled-components';
import { device } from '../styledComponents/device'
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 40%;
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
    color: rgb(41, 153, 72);;
    font-size: 1rem;
    font-weight: bold;
    &:focus{
        display: inline-block;
        box-shadow: 0 0 0 0.2rem #61ed84;
        backdrop-filter: blur(12rem);
        border-radius: 2rem;
    }
    &::placeholder{
        color: #4b4a4a;
        font-weight: 100;
        font-size: 1rem;
    }
    @media (max-width: 480px) { 
        width: 80%;
    }
`
const StyledErrorMsg = styled.p`
    font-size: 0.7em;
    font-weight: bold;
`
const AlignDivFirst = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
    @media (max-width: 480px) { 
        width: 10%;
    }
`
const AlignDiv = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
    display: flex;
    @media (max-width: 480px) { 
        width: 10%;
    }
`
export const TextFieldRegister = ({label,...props}:any) => {
    const [field,meta] = useField(props);
    return (
        <>
            <InputMsgContainer>
                <AlignDivFirst/>
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