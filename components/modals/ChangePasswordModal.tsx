import { DocumentData } from 'firebase/firestore'
import React, { MouseEventHandler } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from "formik"
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { TextField } from '../TextField'
import { getAuth, updatePassword, User } from 'firebase/auth'

const FormikContainer = styled.div`
    width: 40vw;
    height: 40vh;
    background-color: white;
    color: black;
    border: 5px solid black;
`
const ButtonContainer = styled.div`
    margin: 1rem 0 1rem 0;
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`
const LoginButton = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 40%;
    height: 40%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`
const ChangePasswordModal = () => {
    const auth = getAuth();

    const user = auth.currentUser;
    
    const validate = Yup.object({
        password: Yup.string().min(6, "Nejméně 6 znaků").required('Vyžadováno'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hesla se neshodují').required('Vyžadováno'),
    })
    const updateUserPassword = async (values: DocumentData) => {
        //@ts-ignore
        updatePassword(user, values.password).then(() => {
            console.log("update success")
          }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            <Popup
                trigger={<button className="button">Změnit heslo</button>}
                modal
            >
                {(close: MouseEventHandler<HTMLButtonElement>) => (
                    <FormikContainer>
                        <Formik
                            initialValues={{
                                password:'',
                                confirmPassword:''
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                updateUserPassword(values);
                            }}
                        >
                            {formik => (
                                <>
                                    <h1>Změna udaju</h1>
                                    <Form>
                                        <TextField label="Password" name="password" type="password" />
                                        <TextField label="Confirm Password" name="confirmPassword" type="password" />
                                        <ButtonContainer>
                                            <LoginButton type="submit">Změnit</LoginButton>
                                            <LoginButton type="reset">Resetovat</LoginButton>
                                            <button onClick={close}>Zrušit</button>
                                        </ButtonContainer>
                                    </Form>
                                </>
                            )
                            }
                        </Formik>
                    </FormikContainer>
                )}
            </Popup>
        </div>
    )
}

export default ChangePasswordModal
/*

*/ 