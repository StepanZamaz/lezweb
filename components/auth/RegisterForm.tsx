import React from 'react'
import {Formik, Form} from "formik"
import {TextField} from '../TextField'
import * as Yup from 'yup'
export const RegisterForm = () => {
    const validate = Yup.object({
        firstName: Yup.string().max(15,"Must be 15 character or less").required('Required'),
        lastName: Yup.string().max(20,"Must be 20 character or less").required('Required'),
        nickname: Yup.string().max(15,"Must be 15 character or less").required('Required'),
        email: Yup.string().email("Email is invalid").required('Required'),
        password: Yup.string().min(6,"Password must be at least 6 characters").required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Password must match').required('Required'),
    })
    return (
        <Formik
            initialValues={{
                firstName:'',
                lastName:'',
                nickname:'',
                email:'',
                password:'',
                confirmPassword:''
            }}
            validationSchema={validate}
            onSubmit={values =>{
                console.log(values);
            }}
        >
            {formik =>(
                <div>
                    <h1>Register</h1>
                    {console.log(formik.values)}
                    <Form>
                        <TextField label="First Name" name="firstName" type="text" />
                        <TextField label="Last Name" name="lastName" type="text" />
                        <TextField label="Nickname" name="nickname" type="text" />
                        <TextField label="Email" name="email" type="emailt" />
                        <TextField label="Password" name="password" type="password" />
                        <TextField label="Confirm Password" name="confirmPassword" type="password" />
                        <button type="submit">Register</button>
                        <button type="reset">Reset</button>
                    </Form>
                </div>
            )

            }
        </Formik>
    )
}
