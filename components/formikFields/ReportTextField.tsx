import React from 'react'
import { ErrorMessage, useField } from 'formik'
import styled from 'styled-components';
import { device } from '../styledComponents/device';
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 60%;
    padding: 1rem;
`
const StyledInput = styled.input`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 2px 2px 0 #61ed84;
    border-radius: 2rem;
    width: 80%;
    height: 35%;
    margin-left: 10%;
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
        color: #6dc082;
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
    @media ${device.laptop} {
        font-size: 1em;
    }
`
const AlignDiv = styled.div`
    padding: 5%;
    height: 10%;
    width: 80%;
    margin-left: 10%;
    text-align: center;
`
const StyledErrorMsg = styled.p`
    color: white;
    font-size: 1em;
`
const ReportTextField = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    console.log(field, meta)
    return (
        <InputMsgContainer>
            <Label htmlFor={field.name}>{label}</Label>
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
    )
}

export default ReportTextField