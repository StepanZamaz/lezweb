import React from 'react'
import {ErrorMessage, useField } from 'formik'
import styled from 'styled-components';
import { device } from '../styledComponents/device';
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 15%;
    padding: 1rem;
    @media ${device.tablet}{
        flex-direction: column;
        height: 20%;
        justify-content: space-between;
        align-items: center;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`
const StyledInput = styled.input`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 2px 2px 0 #61ed84;
    border-radius: 2rem;
    width: 40%;
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
    @media ${device.tablet}{
        width: 80%;
        height: 100px;
        padding: 0.5rem;
        margin-bottom: 10px;
    }
`
const Label = styled.label`
    font-size: 1.2em;
    font-weight: bold;
    @media ${device.tablet}{
        display: flex;
        justify-content: center;
    }
`
const TextFieldProfile = ({label,...props}:any) => {
    const [field,meta] = useField(props);
    return (
        <InputMsgContainer>
            <Label htmlFor={field.name}>{label}</Label>
            <StyledInput placeholder={label}
            {...field} {...props}
            />
            <ErrorMessage name={field.name}/>
        </InputMsgContainer>
    )
}

export default TextFieldProfile
