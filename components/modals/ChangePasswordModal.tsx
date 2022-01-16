import { DocumentData } from 'firebase/firestore'
import React, { MouseEventHandler } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from "formik"
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { getAuth, updatePassword, User } from 'firebase/auth'
import TextFieldChangePS from '../formikFields/TextFieldChangePS'

const FormikContainer = styled.div`
    width: 25vw;
    height: 60vh;
    background-color: #323232;
    border: 2px solid #61ed84;
    color: #61ed84;
    border-radius: 15px;
    position: relative;
`
const ButtonContainer = styled.div`
    margin: 1rem 0 1rem 0;
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`
const LoginButton = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 30%;
    height: 20%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`
const LoginButtonMain = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 30%;
    height: 50%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`
const CloseButton = styled.button`
    position: absolute; 
    top: 10px; 
    right: 10px;
    width: 2vw;
    height: 3vh;
    background-color: #61ed84;
    border: 2px solid #323232;
    border-radius: 10px;
    cursor: pointer;
`
const Heading = styled.div`
    margin-top: 10%;
    margin-bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
`
const StyledForm = styled(Form)`
    height: 70%;
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
        <>
            <Popup
                trigger={<LoginButtonMain className="button">Změnit heslo</LoginButtonMain>}
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
                                    <Heading>Změna hesla</Heading>
                                    <StyledForm>
                                        <TextFieldChangePS label="Password" name="password" type="password" />
                                        <TextFieldChangePS label="Confirm Password" name="confirmPassword" type="password" />
                                        <ButtonContainer>
                                            <LoginButton type="submit">Změnit</LoginButton>
                                            <LoginButton type="reset">Resetovat</LoginButton>
                                        </ButtonContainer>
                                    </StyledForm>
                                </>
                            )
                            }
                        </Formik>
                        <CloseButton onClick={close}>X</CloseButton>
                    </FormikContainer>
                )}
            </Popup>
        </>
    )
}

export default ChangePasswordModal
/*

*/ 