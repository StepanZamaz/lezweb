import React from 'react'
import { ErrorMessage, useField } from 'formik'
import styled from 'styled-components';
import { device } from '../styledComponents/device';
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    @media ${device.mobileL}{
        flex-direction: column;
        align-items: center;
    }
`
const StyledInput = styled.input`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 2px 2px 0 #61ed84;
    border-radius: 2rem;
    width: 80%;
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
`
const Label = styled.label`
    font-size: 1em;
    font-weight: bold;
    text-align: center;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media (max-width: 600px){
        font-size: 0.6em;
    }
    @media ${device.mobileL}{
        width: 50%;
        margin-bottom: 2%;
    }
`
const StyledErrorMsg = styled.p`
    width: 120%;
    margin-top: 1%;
    display: flex;
    justify-content: center;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media ${device.mobileL}{
        width: 100%;
    }
`
const AddCommentDiv = styled.div`
    width: 100%;
    padding: 0.5rem;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    @media ${device.mobileL}{
        height: 100px;
    }
`
const CommentTextField = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    console.log(field, meta)
    return (
        <AddCommentDiv>
        <InputMsgContainer>
            <Label htmlFor={field.name}>{label}</Label>
            <StyledInput placeholder={label}
                {...field} {...props}
            />
        </InputMsgContainer>
        <ErrorMessage  component="div" name={field.name} >
            {msg => (
                <StyledErrorMsg>{msg}</StyledErrorMsg>
            )}
        </ErrorMessage>
        </AddCommentDiv>
    )
}

export default CommentTextField