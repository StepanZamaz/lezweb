import React from 'react'
import {Field, ErrorMessage} from 'formik'
const GroupSelectField = (props : any)=> {
    const {label, name, options, ...rest} = props;
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest} >
                {
                    Object.keys(options).map((key)=>{
                        const name = options[key].nazevOblasti;
                        const idOblast = options[key].id;
                        const oblast = options[key];
                        return(
                            <>
                                <optgroup label={name}>
                                    {
                                        Object.keys(oblast).map((key)=>{
                                            if(typeof(oblast[key]) == 'object'){
                                                return(
                                                    <option value={oblast[key].idBlok}>{oblast[key].nazevBloku}</option>
                                                )
                                            }
                                        })
                                    }
                                </optgroup>
                            </>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name}/>
        </div>
    )
}

export default GroupSelectField
/*
<option key={name} value={idOblast}>{name}</option>
oblast[key].idBlok,idOblast
*/