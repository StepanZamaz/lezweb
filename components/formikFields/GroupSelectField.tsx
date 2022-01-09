import React from 'react'
import {Field, ErrorMessage} from 'formik'
const GroupSelectField = (props : any)=> {
    const {label, name, options, ...rest} = props;
    console.log("xxxxx",options)
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
                                    /*oblast.cesty.length !== 0 ? (
                                        Object.keys(oblast.cesty).map((key)=>{
                                            console.log(oblast.cesty[key]);
                                            
                                        })
                                    ) : (
                                        <>
                                        {console.log("bbec")}
                                        </>
                                    )*/
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
*/