import React from 'react'
import {Field, ErrorMessage} from 'formik'
import styled from 'styled-components';
import { device } from '../styledComponents/device';
const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    height: 10%;
    padding: 1rem;
    @media ${device.laptop}{
        padding: 0.5rem;
        height: 8%;
    }
    @media (max-width: 600px){
        width: 90%;
    }
`
const Label = styled.label`
    font-size: 1.2em;
    font-weight: bold;
    width: 20%;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media (max-width: 600px){
        letter-spacing: 0rem;
        width: 30%;
        font-size: 0.6em;
    }
`
const FieldOptGroup = styled(Field)`
    width: 30%;
    height: 50%;
`
const OptGroup = styled.optgroup`
    
`
const Option = styled.option`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 2px 2px 0 #61ed84;
    border-radius: 2rem;
    width: 30%;
    height: 50%;
    padding: 1rem;
    border: none;
    outline: none;
    color: #3c354e;
    font-size: 1rem;
    font-weight: bold;
`
const AlignDiv = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
    @media ${device.laptop}{
        font-size: 0.8em;
        height: 6%;
    }
    @media (max-width: 600px){
        width: 20%;
        font-size: 0.6em;
    }
`
const GroupSelectField = (props : any)=> {
    const {label, name, options, ...rest} = props;
    return (
        <InputMsgContainer>
            <Label htmlFor={name}>{label}</Label>
            <Field as='select' id={name} name={name} {...rest} >
                {
                    Object.keys(options).map((key)=>{
                        const name = options[key].nazevOblasti;
                        const idOblast = options[key].id;
                        const oblast = options[key];
                        return(
                            <>
                                <OptGroup label={name}>
                                    {
                                        Object.keys(oblast).map((key)=>{
                                            if(typeof(oblast[key]) == 'object'){
                                                return(
                                                    <Option value={oblast[key].idBlok}>{oblast[key].nazevBloku}</Option>
                                                )
                                            }
                                        })
                                    }
                                </OptGroup>
                            </>
                        )
                    })
                }
            </Field>
            <AlignDiv>
                <ErrorMessage name={name}/>
            </AlignDiv>
            
        </InputMsgContainer>
    )
}

export default GroupSelectField