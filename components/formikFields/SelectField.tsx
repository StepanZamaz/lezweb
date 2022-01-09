import React from 'react'
import {Field, ErrorMessage} from 'formik'
const SelectField = (props : any) => {
    const {label, name, options, ...rest} = props;
    console.log("xxxxx",options)
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest} >
                {
                    Object.keys(options).map((key)=>{
                        const name = options[key].nazevOblasti;
                        const id = options[key].id;
                        return(
                            <>
                                <option key={name} value={id}>{name}</option>
                            </>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name}/>
        </div>
    )
}

export default SelectField
