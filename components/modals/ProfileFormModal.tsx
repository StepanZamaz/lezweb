import React, { MouseEventHandler, useState } from 'react'
import Popup from "reactjs-popup";
import styled from 'styled-components';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik"
import { DocumentData, collection, addDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { storage } from '../../utils/firebase';
import TextFieldAdding from '../formikFields/TextFieldAdding';
import db from "../../utils/firebase";
import { number, string } from 'yup/lib/locale';
import SelectField from '../formikFields/SelectField';
import GroupSelectField from '../formikFields/GroupSelectField';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { async } from '@firebase/util';
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
const ProfileFormModal = (values: DocumentData) => {
    const boulders = values.values;
    const [formNumber, setFormNumber] = useState<number>(0);
    const [progress, setProgress] = useState(0);
    const validateLoc = Yup.object({
        nazevOblasti: Yup.string().max(20, "Maximálně 20 znaků").required("Vyžadováno")
    })
    const validateBlok = Yup.object({
        nazevBloku: Yup.string().max(20, "Maximálně 20 znaků").required("Vyžadováno"),
        lat: Yup.number().min(-90, "Minimum do -90").max(90, "Maximálně do 90").required("Vyžadováno"),
        lng: Yup.number().min(-180, "Minimum do -180").max(180, "Maximálně do 180").required("Vyžadováno"),
    })
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];
    const validateRoute = Yup.object({

        autor: Yup.string().max(20, "Maximálně 20 znaků").required("Vyžadováno"),
        hodnoceni: Yup.string().max(3, "Maximálně 3 znaky").required("Vyžadováno"),
        nazevCesty: Yup.string().max(20, "Maximálně 20 znaků").required("Vyžadováno"),
        img: Yup.mixed().test(
            "FILE_FORMAT",
            "Nepodporovaný formát.",
            value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
    })

    const AddLoc = async (values: DocumentData) => {
        const docRef = await addDoc(collection(db, "boulders"), {
            nazevOblasti: values.nazevOblasti
        });
    }
    var generateID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    const AddBlok = async (values: DocumentData) => {
        const washingtonRef = doc(db, "boulders", values.idDoc);
        const blokMapId = generateID();
        await updateDoc(washingtonRef, {
            [blokMapId]: {
                cesty: {},
                idBlok: blokMapId,
                lat: values.lat,
                lng: values.lng,
                nazevBloku: values.nazevBloku
            }
        });
    }
    const uploadFile = (values: DocumentData) => {
        let idLoc : string = "";
        Object.keys(boulders).map((key) =>{
            const name = boulders[key].nazevOblasti;
            const idOblast = boulders[key].id;
            const oblast = boulders[key];
            Object.keys(oblast).map((key)=>{
                if(typeof(oblast[key]) == 'object'){
                    if(values.idBlok === oblast[key].idBlok){
                        idLoc = idOblast;
                    }
                }
            })
        })
        const file: any = values.img;
        const oblastRef : string = idLoc;
        if (!file) return;
        const storageRef = ref(storage, `/${oblastRef}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => AddRouteWithImg(values,idLoc,url));
            }
        )
    }
    const AddRouteWithoutImg = async (values: DocumentData) => {
        let idLoc: string = "";
        Object.keys(boulders).map((key) => {
            const name = boulders[key].nazevOblasti;
            const idOblast = boulders[key].id;
            const oblast = boulders[key];
            Object.keys(oblast).map((key) => {
                if (typeof (oblast[key]) == 'object') {
                    if (values.idBlok === oblast[key].idBlok) {
                        idLoc = idOblast;
                    }
                }
            })
        })
        const washingtonRef = doc(db, "boulders", idLoc);
        const routeId = generateID();

        await setDoc(washingtonRef, {
            [values.idBlok]: {
                cesty: {
                    [routeId]: {
                        autor: values.autor,
                        hodnoceni: values.hodnoceni,
                        nazevCesty: values.nazevCesty,
                        id: routeId,
                        img: ""
                    }
                }
            }
        }, { merge: true });
    }
    const AddRouteWithImg = async (values: DocumentData, idLoc : string, url: string) =>{
        const washingtonRef = doc(db, "boulders", idLoc);
        const routeId = generateID();
        await setDoc(washingtonRef, {
            [values.idBlok]: {
                cesty: {
                    [routeId] : {
                        autor: values.autor,
                        hodnoceni: values.hodnoceni,
                        nazevCesty: values.nazevCesty,
                        id: routeId,
                        img: url
                    }
                }
          }
        }, {merge: true});
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
                                                    idDoc: '',
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
                                                            <SelectField label="Vyber oblast:" name="idDoc" options={boulders} />
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
                                                    idBlok: '',
                                                    autor: '',
                                                    hodnoceni: '',
                                                    nazevCesty: '',
                                                    img: ''
                                                }}
                                                validationSchema={validateRoute}
                                                onSubmit={values => {
                                                    console.log("img", values.img)
                                                    if (typeof(values.img)== "undefined") {
                                                        AddRouteWithoutImg(values);
                                                    }
                                                    else uploadFile(values);
                                                }}
                                            >
                                                {formik => (
                                                    <>
                                                        <h1>Přidat Cestu</h1>
                                                        <Form>
                                                            <GroupSelectField label="Vyber oblast a blok:" name="idBlok" options={boulders} />
                                                            <TextFieldAdding label="Autor" name="autor" type="text" />
                                                            <TextFieldAdding label="Hodnocení" name="hodnoceni" type="text" />
                                                            <TextFieldAdding label="Název cesty" name="nazevCesty" type="text" />
                                                            <input type='file' name='img' accept="image/png, image/jpeg, image/jpg," onChange={(event) =>
                                                                //@ts-ignore
                                                                formik.setFieldValue("img", event.target.files[0])

                                                            } /> <ErrorMessage name="img" />
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

const AddRoute = async (values: DocumentData) =>{
        let idLoc : string = "";
        Object.keys(boulders).map((key) =>{
            const name = boulders[key].nazevOblasti;
            const idOblast = boulders[key].id;
            const oblast = boulders[key];
            Object.keys(oblast).map((key)=>{
                if(typeof(oblast[key]) == 'object'){
                    if(values.idBlok === oblast[key].idBlok){
                        idLoc = idOblast;
                    }
                }
            })
        })
        const washingtonRef = doc(db, "adminReq", idLoc);
        const routeId = generateID();
        if(values.img === ""){
            await setDoc(washingtonRef, {
                [values.idBlok]: {
                    cesty: {
                        [routeId] : {
                            autor: values.autor,
                            hodnoceni: values.hodnoceni,
                            nazevCesty: values.nazevCesty,
                            id: routeId,
                            img: ""
                        }
                    }
              }
            }, {merge: true});
        }
        else {
            const url = uploadFile(values.img, idLoc);
            console.log("url", url);
            console.log(progress);
            await setDoc(washingtonRef, {
                [values.idBlok]: {
                    cesty: {
                        [routeId] : {
                            autor: values.autor,
                            hodnoceni: values.hodnoceni,
                            nazevCesty: values.nazevCesty,
                            id: routeId,
                            img: ""
                        }
                    }
              }
            }, {merge: true});
        }
    }
*/ 