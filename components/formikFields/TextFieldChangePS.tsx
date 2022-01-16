import React from 'react'
import {ErrorMessage, useField } from 'formik'
import styled from 'styled-components'

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
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8vw;
    line-height: normal;
`
const AlignDiv = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
`
const TextFieldChangePS = ({label,...props}:any) => {
    const [field,meta] = useField(props);
    console.log(field,meta)
    return (
        <>
            <InputMsgContainer>
                <AlignDiv/>
                <StyledInput placeholder={label}
                {...field} {...props}
                />
                <AlignDiv>
                    <ErrorMessage  component="div" name={field.name} >
                        {msg => (
                            <StyledErrorMsg>{msg}</StyledErrorMsg>
                        )}
                    </ErrorMessage>
                </AlignDiv>
            </InputMsgContainer>
            
        </>  
    )
}

export default TextFieldChangePS
