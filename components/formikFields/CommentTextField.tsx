import React from 'react'
import { ErrorMessage, useField } from 'formik'
import styled from 'styled-components';
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 80%;
    margin-left: 10%;
    height: 50%;
    padding: 1rem;
`
const StyledInput = styled.input`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 2px 2px 0 #61ed84;
    border-radius: 2rem;
    width: 80%;
    height: 50%;
    margin-left: 10%;
    padding: 1rem;
    border: none;
    outline: none;
    color: #3c354e;
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
`
const Label = styled.label`
    height: 20%;
    font-size: 1.2em;
    font-weight: bold;
    padding: 5%;
    text-align: center;
`

const CommentTextField = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    console.log(field, meta)
    return (
        <InputMsgContainer>
            <Label htmlFor={field.name}>{label}</Label>
            <StyledInput placeholder={label}
                {...field} {...props}
            />
        </InputMsgContainer>
    )
}

export default CommentTextField