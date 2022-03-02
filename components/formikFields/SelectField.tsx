import React, { useState } from 'react'
import {Field, ErrorMessage} from 'formik'
import styled from 'styled-components';

const InputMsgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    height: 10%;
    padding: 1rem;
`
const Label = styled.label`
    font-size: 1.2em;
    font-weight: bold;
    width: 20%;
`
const FieldSelect = styled(Field)`
    width: 30%;
    height: 50%;
`
const AlignDiv = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
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
