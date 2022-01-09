import React, { MouseEventHandler, useState } from 'react'
import Popup from "reactjs-popup";
import styled from 'styled-components';
import * as Yup from 'yup'
import { Formik, Form, Field } from "formik"
import { DocumentData, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import TextFieldAdding from '../formikFields/TextFieldAdding';
import db from "../../utils/firebase";
import { number, string } from 'yup/lib/locale';
import SelectField from '../formikFields/SelectField';
import GroupSelectField from '../formikFields/GroupSelectField';
const ModalDiv = styled.div`
    width: 80vw;
    height: 80vh;
    background-color: white;
    color: black;
    position: relative;
`
const CloseButton = styled.button`
    position: absolute; 
    top: 10px; 
    right: 10px;
`
const ButtonDiv = styled.div`
    width: 100%;
    height: 15%;
`
const FormDiv = styled.div`
    width: 100%;
    height: 85%;
`
const FormikLoc = styled.div`
    
`
const ButtonContainer = styled.div`
    
`
const ProfileFormModal = (values : DocumentData) => {
    const boulders = values.values;
    const [formNumber, setFormNumber] = useState<number>(0);
    const validateLoc = Yup.object({
        nazevOblasti: Yup.string().max(20, "Maximálně 20 znaků").required("Vyžadováno")
    })
    const validateBlok = Yup.object({
        nazevBloku: Yup.string().max(20, "Maximálně 20 znaků").required("Vyžadováno"),
        lat: Yup.number().min(-90, "Minimum do -90").max(90, "Maximálně do 90").required("Vyžadováno"),
        lng: Yup.number().min(-180, "Minimum do -180").max(180, "Maximálně do 180").required("Vyžadováno"),
    })

    const AddLoc = async (values: DocumentData) =>{
        const docRef = await addDoc(collection(db, "adminReq"), {
            nazevOblasti: values.nazevOblasti
        });
    }
    var generateID = () =>{
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    const AddBlok = async (values: DocumentData) =>{
        const washingtonRef = doc(db, "adminReq", values.idDoc);
        const blokMapId = generateID();
        await updateDoc(washingtonRef, {
             [blokMapId] : {
                cesty: {},
                idBlok: generateID(),
                lat: values.lat,
                lng: values.lng,
                nazevBloku: values.nazevBloku
            }
        });
    }
    return (
        <div>
            <Popup
                trigger={<button className="button"> Přidat informace </button>}
                modal
            >
                {(close: MouseEventHandler<HTMLButtonElement>) => (
                    <ModalDiv>
                        <ButtonDiv>
                            <button onClick={() => { setFormNumber(0) }}>Přidat oblast</button>
                            <button onClick={() => { setFormNumber(1) }}>Přidat blok</button>
                            <button onClick={() => { setFormNumber(2) }}>Přidat cestu</button>
                        </ButtonDiv>
                        <FormDiv>
                            {
                                formNumber === 1 ? (
                                    <>
                                        <FormikLoc>
                                            <Formik
                                                initialValues={{
                                                    idDoc : '',
                                                    nazevBloku: '',
                                                    lat: number,
                                                    lng: number
                                                }}
                                                validationSchema={validateBlok}
                                                onSubmit={values => {
                                                    AddBlok(values);
                                                }}
                                            >
                                                {formik => (
                                                    <>
                                                        <h1>Přidat Blok</h1>
                                                        <Form>
                                                            <SelectField label="Vyber oblast:" name="idDoc" options={boulders}/>
                                                            <TextFieldAdding label="Název bloku" name="nazevBloku" type="text" />
                                                            <TextFieldAdding label="Zeměpisná šířka" name="lat" type="number" />
                                                            <TextFieldAdding label="Zeměpisná délka" name="lng" type="number" />
                                                            <ButtonContainer>
                                                                <button type="submit">Přidat</button>
                                                                <button type="reset">Resetovat</button>
                                                            </ButtonContainer>
                                                        </Form>
                                                    </>
                                                )
                                                }
                                            </Formik>
                                        </FormikLoc>
                                    </>
                                ) : formNumber === 2 ? (
                                    <div>
                                        <FormikLoc>
                                            <Formik
                                                initialValues={{
                                                    idDoc : '',
                                                    idBlok : ''
                                                }}
                                                validationSchema={validateBlok}
                                                onSubmit={values => {
                                                    AddBlok(values);
                                                }}
                                            >
                                                {formik => (
                                                    <>
                                                        <h1>Přidat Cestu</h1>
                                                        <Form>
                                                            <GroupSelectField label="Vyber oblast:" name="idDoc" options={boulders}/>
                                                            <TextFieldAdding label="Název bloku" name="nazevBloku" type="text" />
                                                            <TextFieldAdding label="Zeměpisná šířka" name="lat" type="number" />
                                                            <TextFieldAdding label="Zeměpisná délka" name="lng" type="number" />
                                                            <ButtonContainer>
                                                                <button type="submit">Přidat</button>
                                                                <button type="reset">Resetovat</button>
                                                            </ButtonContainer>
                                                        </Form>
                                                    </>
                                                )
                                                }
                                            </Formik>
                                        </FormikLoc>
                                    </div>
                                ) : (
                                    <>
                                        <FormikLoc>
                                            <Formik
                                                initialValues={{
                                                    nazevOblasti: ''
                                                }}
                                                validationSchema={validateLoc}
                                                onSubmit={values => {
                                                    AddLoc(values);
                                                }}
                                            >
                                                {formik => (
                                                    <>
                                                        <h1>Přidat Oblast</h1>
                                                        <Form>
                                                            <TextFieldAdding label="Název oblasti" name="nazevOblasti" type="text" />
                                                            <ButtonContainer>
                                                                <button type="submit">Přidat</button>
                                                                <button type="reset">Resetovat</button>
                                                            </ButtonContainer>
                                                        </Form>
                                                    </>
                                                )
                                                }
                                            </Formik>
                                        </FormikLoc>
                                    </>
                                )
                            }
                        </FormDiv>
                        <CloseButton onClick={close}>X</CloseButton>
                    </ModalDiv>
                )}
            </Popup>
        </div>
    )
}

export default ProfileFormModal
/*
<Field as="select" name="idDoc">
                                                                {
                                                                    
                                                                }
                                                            </Field>
*/ 