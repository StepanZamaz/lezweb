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

const logo = require('../../public/logo.png');

const ModalDiv = styled.div`
    width: 50vw;
    height: 85vh;
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
const Icon = styled.img`
    position: absolute;
    right: 20px;
    bottom: 20px;
    height: 10vh;
`
const ButtonDiv = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    border-bottom: 5px solid #61ed84;

`
const FormDiv = styled.div`
    width: 100%;
    height: 82%;
`
const ButtonChoose = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 20%;
    height: 40%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    :hover {
        background-color: rgb(41, 153, 72);
    }
`
const Button = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 20%;
    height: 100%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`
const FormikDiv = styled.div`
    height: 100%;
`
const ButtonContainer = styled.div`
    margin-top: 1%;
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
`
const ButtonMenu = styled.button`
    height: 60%;
    width: 7vw;
    border-radius: 10px;
    background-color: #61ed84;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    :hover {
        background-color: rgb(41, 153, 72);
    }
    font-size: 80%;
`
const ChooseInfoDiv = styled.div`
    margin-top: 2%;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
`
const FormLoc = styled(Form)`
    height: 90%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const FormBlok = styled(Form)`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const FormRoute = styled(Form)`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const AlignDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    height: 10%;
    padding: 1rem;
`
const AlignDiv2 = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
`
const LabelDiv = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    width: 20%;
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
        material: Yup.string().max(10, "Maximálně 10 znaků").required("Vyžadováno"),
        delka: Yup.string().max(3, "Maximálně 3 znaky").required("Vyžadováno"),
        popisCesty: Yup.string().max(100, "Maximálně 100 znaků"),
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
                        material: values.material,
                        delka: values.delka,
                        popisCesty: values.popisCesty,
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
                        material: values.material,
                        delka: values.delka,
                        popisCesty: values.popisCesty,
                        id: routeId,
                        img: url
                    }
                }
          }
        }, {merge: true});
        console.log("finished");
    }
    return (
        <div>
            <Popup
                trigger={<ButtonMenu>Přidat informace</ButtonMenu>}
                modal
                closeOnDocumentClick
            >
                {(close: MouseEventHandler<HTMLButtonElement>) => (
                    <ModalDiv>
                        <ButtonDiv>
                            <ButtonChoose onClick={() => { setFormNumber(0) }}>Přidat oblast</ButtonChoose>
                            <ButtonChoose onClick={() => { setFormNumber(1) }}>Přidat blok</ButtonChoose>
                            <ButtonChoose onClick={() => { setFormNumber(2) }}>Přidat cestu</ButtonChoose>
                        </ButtonDiv>
                        <FormDiv>
                            {
                                formNumber === 1 ? (
                                    <>
                                        <FormikDiv>
                                            <Formik
                                                initialValues={{
                                                    idDoc: '',
                                                    nazevBloku: '',
                                                    lat: number,
                                                    lng: number
                                                }}
                                                validationSchema={validateBlok}
                                                onSubmit={values => {
                                                    console.log("xxxjl", values)
                                                    AddBlok(values);
                                                }}
                                            >
                                                {formik => (
                                                    <>
                                                        <ChooseInfoDiv>Přidat Blok</ChooseInfoDiv>
                                                        <FormBlok>
                                                            <SelectField label="Vyber oblast:" name="idDoc" options={boulders} />
                                                            <TextFieldAdding label="Název bloku" name="nazevBloku" type="text" />
                                                            <TextFieldAdding label="Zeměpisná šířka" name="lat" type="number" />
                                                            <TextFieldAdding label="Zeměpisná délka" name="lng" type="number" />
                                                            <ButtonContainer>
                                                                <Button type="submit">Přidat</Button>
                                                                <Button type="reset">Resetovat</Button>
                                                            </ButtonContainer>
                                                        </FormBlok>
                                                    </>
                                                )
                                                }
                                            </Formik>
                                        </FormikDiv>
                                    </>
                                ) : formNumber === 2 ? (
                                    <>
                                        <FormikDiv>
                                            <Formik
                                                initialValues={{
                                                    idBlok: '',
                                                    autor: '',
                                                    hodnoceni: '',
                                                    nazevCesty: '',
                                                    material: '',
                                                    delka: '',
                                                    popisCesty: '',
                                                    img: ''
                                                }}
                                                validationSchema={validateRoute}
                                                onSubmit={values => {
                                                    console.log("xxx", values)
                                                    console.log("xxx", values.img)
                                                    if (values.img==="" || typeof(values.img) === "undefined") {
                                                        AddRouteWithoutImg(values);
                                                    }
                                                    else uploadFile(values);
                                                }}
                                            >
                                                {formik => (
                                                    <>
                                                        <ChooseInfoDiv>Přidat Cestu</ChooseInfoDiv>
                                                        <FormRoute>
                                                            <GroupSelectField label="Vyber oblast a blok:" name="idBlok" options={boulders} />
                                                            <TextFieldAdding label="Autor" name="autor" type="text" />
                                                            <TextFieldAdding label="Hodnocení" name="hodnoceni" type="text" />
                                                            <TextFieldAdding label="Název cesty" name="nazevCesty" type="text" />
                                                            <TextFieldAdding label="Materiál" name="material" type="text" />
                                                            <TextFieldAdding label="Délka" name="delka" type="text" />
                                                            <TextFieldAdding label="Popis cesty" name="popisCesty" type="text" />
                                                            <AlignDiv>
                                                                <LabelDiv>Přidat fotku</LabelDiv>
                                                                <input type='file' name='img' accept="image/png, image/jpeg, image/jpg," onChange={(event) =>
                                                                    //@ts-ignore
                                                                    formik.setFieldValue("img", event.target.files[0])

                                                                } /> <AlignDiv2><ErrorMessage name="img" /></AlignDiv2>
                                                            </AlignDiv>
                                                            <ButtonContainer>
                                                                <Button type="submit">Přidat</Button>
                                                                <Button type="reset">Resetovat</Button>
                                                            </ButtonContainer>
                                                        </FormRoute>
                                                    </>
                                                )
                                                }
                                            </Formik>
                                        </FormikDiv>
                                    </>
                                ) : (
                                    <>
                                        <FormikDiv>
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
                                                        <ChooseInfoDiv>Přidat Oblast</ChooseInfoDiv>
                                                        <FormLoc>
                                                            <TextFieldAdding label="Název oblasti" name="nazevOblasti" type="text" />
                                                            <ButtonContainer>
                                                                <Button type="submit">Přidat</Button>
                                                                <Button type="reset">Resetovat</Button>
                                                            </ButtonContainer>
                                                        </FormLoc>
                                                    </>
                                                )
                                                }
                                            </Formik>
                                        </FormikDiv>
                                    </>
                                )
                            }
                        </FormDiv>
                        <CloseButton onClick={close}>X</CloseButton>
                        <Icon src={logo.default.src} alt="Logo"></Icon>
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