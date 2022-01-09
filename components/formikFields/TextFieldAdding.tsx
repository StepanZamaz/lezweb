import React from 'react'
import {ErrorMessage, useField } from 'formik'

const TextFieldAdding = ({label,...props}:any) => {
    const [field,meta] = useField(props);
    console.log(field,meta)
    return (
        <div>
            <label htmlFor={field.name}>{label}</label>
            <input placeholder=''
            {...field} {...props}
            />
            <ErrorMessage name={field.name}/>
        </div>
    )
}

export default TextFieldAdding
