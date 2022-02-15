import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import * as Yup from 'yup'
import { Formik, Form } from "formik"
import { GoReport } from 'react-icons/go'
import ReportTextField from '../formikFields/ReportTextField'
import { addDoc, collection, doc, DocumentData, setDoc } from 'firebase/firestore'
import db from "../../utils/firebase";
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
const ReportButton = styled(GoReport)`
    position: absolute;
    font-size: 3.5em;
    bottom: 8%;
    right: -5%;
    transform: scaleX(-1) rotate(-360deg);
    :hover {
        transform: scale(1.2) scaleX(-1) rotate(-360deg);
    }
`
const ReportDiv = styled.div`
    width: 25vw;
    height: 60vh;
    background-color: #323232;
    border: 2px solid #61ed84;
    color: #61ed84;
    border-radius: 15px;
    position: relative;
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
const ReportHeader = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
`
const StyledForm = styled(Form)`
    height: 85%;
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
const ReportModal = () => {
    const auth = getAuth();
    const router = useRouter();
    const { locations,route} = router.query;
    const sendReport = async (values: DocumentData) =>{
        const docRef = await addDoc(collection(db, "reports"), {
            reportText: values.reportText,
            locationId: locations,
            routeId: route,
            reportedBy: auth.currentUser?.uid,
            status: "waiting"
        });
    }
    
    const validate = Yup.object({
        reportText: Yup.string().max(100, "Maximálně 100 znaků").required('Vyžadováno'),
    })
    return (
        <>
            <Popup
                trigger={<ReportButton />}
                modal
            >
                {(close: MouseEventHandler<HTMLButtonElement>) => (
                    <ReportDiv>
                        <Formik
                            initialValues={{
                                reportText: ''
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                sendReport(values);
                            }}
                        >
                            {formik => (
                                <>
                                    <ReportHeader>
                                        Nahlásit chybné informace
                                    </ReportHeader>
                                    <StyledForm>
                                        <ReportTextField label="Napište nám, co je špatně" name="reportText" type="text"/>
                                        <ButtonContainer>
                                            <LoginButton type="submit">Odeslat</LoginButton>
                                            <LoginButton type="reset">Resetovat</LoginButton>
                                        </ButtonContainer>
                                    </StyledForm>
                                </>
                            )}
                        </Formik>
                        <CloseButton onClick={close}>X</CloseButton>
                    </ReportDiv>
                )}
            </Popup>
        </>
    )
}

export default ReportModal