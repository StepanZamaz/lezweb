import React, { useState } from 'react'
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
const FieldSelect = styled(Field)`
    width: 30%;
    height: 50%;
`
const AlignDiv = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
    @media (max-width: 600px){
        margin-left: 2%;
        width: 20%;
        font-size: 0.6em;
    }
`
const SelectField = (props : any) => {
    const {label, name, options, ...rest} = props;
    const [selected, setSelected] = useState(true);
    return (
        <InputMsgContainer>
            <Label htmlFor={name}>{label}</Label>
            <Field as='select' id={name} name={name} {...rest} >
                {
                    Object.keys(options).map((key)=>{
                        const name = options[key].nazevOblasti;
                        const id = options[key].id;
                            if(selected){
                                setSelected(false);
                                return(
                                    <>
                                        <option selected={true} key={name} value={id}>{name}</option>
                                    </>
                                )
                            }
                            else {
                                return(
                                    <>
                                        <option key={name} value={id}>{name}</option>
                                    </>
                                )
                            }
                        
                    })
                }
            </Field>
            <AlignDiv>
                <ErrorMessage name={name}/>
            </AlignDiv>
            
        </InputMsgContainer>
    )
}

export default SelectField
