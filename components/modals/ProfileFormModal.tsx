import React, { MouseEventHandler, useState } from 'react'
import Popup from "reactjs-popup";
import styled from 'styled-components';
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from "formik"
import { DocumentData, collection, addDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { storage } from '../../utils/firebase';
import TextFieldAdding from '../formikFields/TextFieldAdding';
import db from "../../utils/firebase";
import { number, string } from 'yup/lib/locale';
import SelectField from '../formikFields/SelectField';
import GroupSelectField from '../formikFields/GroupSelectField';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { device } from '../styledComponents/device';

const logo = require('../../public/logo.png');

const ModalDiv = styled.div`
    width: 1000px;
    height: 900px;
    background-color: #323232;
    border: 2px solid #61ed84;
    color: #61ed84;
    border-radius: 15px;
    position: relative;
    @media ${device.laptopL}{
        width: 800px;
        height: 700px;
    }
    @media ${device.laptop}{
        width: 600px;
        height: 500px;
    }
    @media (max-width: 600px){
        width: 320px;
    }
`
const CloseButton = styled.button`
    position: absolute; 
    top: 10px; 
    right: 10px;
    width: 35px;
    height: 35px;
    background-color: #61ed84;
    border: 2px solid #323232;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        background-color: rgb(41, 153, 72);
    }
    @media ${device.laptop}{
        top: 5px;
        right: 5px;
    }
    @media (max-width: 600px){
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
    }
`
const Icon = styled.img`
    position: absolute;
    right: 20px;
    bottom: 20px;
    height: 10vh;
    @media (max-width: 600px){
        display: none;
    }
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
    @media ${device.laptop}{
        height: 10%;
    }
    @media (max-width: 600px){
        margin-left: 2.5%;
        margin-right: 2.5%;
        width: 95%;
    }
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
    @media ${device.laptop}{
        font-size: 0.7em;
        letter-spacing: 0.1rem;
        height: 60%;
    }
    @media (max-width: 600px){
        font-size: 0.5em;
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
    :hover {
        background-color: rgb(41, 153, 72);
    }
    @media (max-width: 600px){
        letter-spacing: 0.1rem;
        width: 35%;
    }
`
const FormikDiv = styled.div`
    height: 100%;
`
const ButtonContainer = styled.div`
    margin-top: 2%;
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    @media ${device.laptop}{
        height: 4%;
    }
    @media (max-width: 600px){
        margin-top: 5%;
    }
`
const ButtonMenu = styled.button`
    height: 60%;
    width: 130px;
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
    @media ${device.tablet}{
        font-size: 0.6em;
        width: 100px;
        height: 45px;
    }
    @media (max-width: 578px){
        width: 90px;
        font-size: 0.5em;
    }
`
const ChooseInfoDiv = styled.div`
    margin-top: 2%;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    @media ${device.laptop}{
        font-size: 1.5em;
    }
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
    @media ${device.laptop}{
        padding: 0.2rem;
        height: 6%;
    }
    @media (max-width: 600px){
        width: 90%;
    }
`
const AlignDiv2 = styled.div`
    height: 2rem;
    width: 20%;
    position: relative;
    @media (max-width: 600px){
        display: none;
    }
`
const LabelDiv = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    width: 20%;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media (max-width: 600px){
        width: 30%;
        font-size: 0.6em;
    }
`
const FotoInput = styled.input`
    
`
const ProfileFormModal = (values: DocumentData) => {
    const boulders = values.values;
    const [formNumber, setFormNumber] = useState<number>(0);
    const [progress, setProgress] = useState(0);
    const validateLoc = Yup.object({
        nazevOblasti: Yup.string().max(20, "Maxim??ln?? 20 znak??").required("Vy??adov??no")
    })
    const validateBlok = Yup.object({
        idDoc: Yup.string().required("Vy??adov??no"),
        nazevBloku: Yup.string().max(20, "Maxim??ln?? 20 znak??").required("Vy??adov??no"),
        lat: Yup.number().typeError('Zadejte ????slo').min(-90, "Minimum do -90").max(90, "Maxim??ln?? do 90").required("Vy??adov??no"),
        lng: Yup.number().typeError('Zadejte ????slo').min(-180, "Minimum do -180").max(180, "Maxim??ln?? do 180").required("Vy??adov??no")
    })
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];
    const validateRoute = Yup.object({
        idBlok: Yup.string().required("Vy??adov??no"),
        autor: Yup.string().max(20, "Maxim??ln?? 20 znak??").required("Vy??adov??no"),
        hodnoceni: Yup.string().max(3, "Maxim??ln?? 3 znaky").required("Vy??adov??no"),
        nazevCesty: Yup.string().max(20, "Maxim??ln?? 20 znak??").required("Vy??adov??no"),
        material: Yup.string().max(10, "Maxim??ln?? 10 znak??").required("Vy??adov??no"),
        delka: Yup.string().max(5, "Maxim??ln?? 5 znak??").required("Vy??adov??no"),
        popisCesty: Yup.string().max(250, "Maxim??ln?? 250 znak??"),
        img: Yup.mixed().test(
            "FILE_FORMAT",
            "Nepodporovan?? form??t.",
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
    const FcSucces = () =>{
        alert("P??id??n?? prob??hlo ??sp????n??");
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
    }
    return (
        <div>
            <Popup
                trigger={<ButtonMenu>P??idat informace</ButtonMenu>}
                modal
                closeOnDocumentClick
            >
                {(close: MouseEventHandler<HTMLButtonElement>) => (
                    <ModalDiv>
                        <ButtonDiv>
                            <ButtonChoose onClick={() => { setFormNumber(0) }}>P??idat oblast</ButtonChoose>
                            <ButtonChoose onClick={() => { setFormNumber(1) }}>P??idat blok</ButtonChoose>
                            <ButtonChoose onClick={() => { setFormNumber(2) }}>P??idat cestu</ButtonChoose>
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
                                                onSubmit={(values, { resetForm }) => {
                                                    AddBlok(values);
                                                    setTimeout(FcSucces, 1000);
                                                    setTimeout(()=>(resetForm()),1500); 
                                                }}
                                                key={1}
                                            >
                                                {formik => (
                                                    <>
                                                        <ChooseInfoDiv>P??idat Blok</ChooseInfoDiv>
                                                        <FormBlok>
                                                            <SelectField label="Vyber oblast:" name="idDoc" options={boulders} />
                                                            <TextFieldAdding label="N??zev bloku" name="nazevBloku" type="text" />
                                                            <TextFieldAdding label="Zem??pisn?? ??????ka" name="lat" type="number" />
                                                            <TextFieldAdding label="Zem??pisn?? d??lka" name="lng" type="number" />
                                                            <ButtonContainer>
                                                                <Button type="submit">P??idat</Button>
                                                                <Button type='reset'>Resetovat</Button>
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
                                                onSubmit={(values, { resetForm })  => {
                                                    if (values.img==="" || typeof(values.img) === "undefined") {
                                                        AddRouteWithoutImg(values);
                                                    }
                                                    else uploadFile(values);
                                                    setTimeout(FcSucces, 1000);
                                                    setTimeout(()=>(resetForm()),1500);  
                                                }}
                                                key={2}
                                            >
                                                {formik => (
                                                    <>
                                                        <ChooseInfoDiv>P??idat Cestu</ChooseInfoDiv>
                                                        <FormRoute>
                                                            <GroupSelectField label="Vyber oblast a blok:" name="idBlok" options={boulders} />
                                                            <TextFieldAdding label="Autor" name="autor" type="text" />
                                                            <TextFieldAdding label="Hodnocen??" name="hodnoceni" type="text" />
                                                            <TextFieldAdding label="N??zev cesty" name="nazevCesty" type="text" />
                                                            <TextFieldAdding label="Materi??l" name="material" type="text" />
                                                            <TextFieldAdding label="D??lka" name="delka" type="text" />
                                                            <TextFieldAdding label="Popis cesty" name="popisCesty" type="text" />
                                                            <AlignDiv>
                                                                <LabelDiv>P??idat fotku</LabelDiv>
                                                                <FotoInput type='file' name='img' accept="image/png, image/jpeg, image/jpg," onChange={(event) =>
                                                                    //@ts-ignore
                                                                    formik.setFieldValue("img", event.target.files[0])

                                                                } /> <AlignDiv2><ErrorMessage name="img" /></AlignDiv2>
                                                            </AlignDiv>
                                                            <ButtonContainer>
                                                                <Button type="submit">P??idat</Button>
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
                                                onSubmit={(values, { resetForm }) => {
                                                    AddLoc(values);
                                                    setTimeout(FcSucces, 1000);
                                                    setTimeout(()=>(resetForm()),1500);  
                                                }}
                                                key={3}
                                            >
                                                {formik => (
                                                    <>
                                                        <ChooseInfoDiv>P??idat Oblast</ChooseInfoDiv>
                                                        <FormLoc>
                                                            <TextFieldAdding label="N??zev oblasti" name="nazevOblasti" type="text" />
                                                            <ButtonContainer>
                                                                <Button type="submit">P??idat</Button>
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