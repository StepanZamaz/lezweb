import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAuth, onAuthStateChanged, sendEmailVerification, updateProfile, User } from "firebase/auth";
import db, { auth } from '../utils/firebase';
import { collection, DocumentData, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Router from 'next/router';
import * as Yup from 'yup'
import { Formik, Form } from "formik"
import TextFieldProfile from './formikFields/TextFieldProfile';
import Link from 'next/link';
import ProfileFormModal from './modals/ProfileFormModal'
import ChangePasswordModal from './modals/ChangePasswordModal'
import { device } from './styledComponents/device';
import ReactLoading from 'react-loading';
const logo = require('../public/logo.png');

const ComponentDiv = styled.div`
    display: grid;
    grid-template-columns: 30% 30% 20% 20%;
    grid-template-rows: 40px 80px 300px;
    grid-template-areas: 
    "header header header header"
    "button button button button"
    "main main other other";
    row-gap: 10%;
    @media ${device.tablet}{
        grid-template-columns: 20% 80%;
        grid-template-rows: 40px 80px 150px 150px;
        grid-template-areas: 
        "button header "
        "button main "
        "button main "
        "button main ";
    }
`
const ComponentDiv2 = styled.div`
    display: grid;
    grid-template-columns: 30% 30% 20% 20%;
    grid-template-rows: 40px 80px 500px;
    grid-template-areas: 
    "header header header header"
    "button button button button"
    "main main main main";
    row-gap: 7%;
    @media ${device.tablet}{
        grid-template-columns: 20% 80%;
        grid-template-rows: 40px 80px 150px 150px;
        grid-template-areas: 
        "button header "
        "button main "
        "button main "
        "button main ";
    }
`
const ContentDiv = styled.div`
    grid-area: main;
    width: 100%;
    @media ${device.tablet}{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media ${device.mobileL}{
        align-items: flex-end;
    }
`
const IconDiv = styled.div`
    margin-top: 20%;
    grid-area: other;
    height: 100%;
    width: 100%;
    text-align: center;
    margin-left: 3%;
`
const StyledImg = styled.img`
    height: 100%;
    @media ${device.tablet}{
        display: none;
    }
`
const MenuDiv = styled.div`
    grid-area: button;
    display:flex;
    justify-content: space-around;
    border-bottom: 5px solid black;
    @media ${device.tablet}{
        flex-direction: column;
        border-bottom: none;
        border-right: 5px solid black;
    }
    @media (max-width: 578px){
        align-items: center;
        width: 120px;
    }
    @media ${device.mobileL}{
        width: 100px;
    }
`
const HeaderDiv = styled.div`
    grid-area: header;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    @media (max-width: 578px){
        font-size: 2.3rem;
    }
`
const ButtonContainer = styled.div`
    margin: 1rem 0 1rem 0;
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    @media ${device.tablet}{
        width: 400px;
        justify-content: space-evenly;
    }
    @media (max-width: 530px){
        width: 100px;
        flex-direction: column;
        height: 30%;
    }
`
const LoginButton = styled.button`
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
    :hover {
        background-color: rgb(41, 153, 72);
    }
    @media ${device.tablet}{
        width: 30%;
        letter-spacing: 0.1rem;
        font-size: 0.7em;
    }
    @media (max-width: 530px){
        width: 100%;
        height: 25%;
    }
`
const FormikContainer = styled.div`
    height: 100%;
    width: 100%;
    grid-area: main;
    @media ${device.mobileM}{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
const FormFormik = styled(Form)`
    height: 100%;
    width: 100%;
    @media ${device.tablet}{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    @media ${device.mobileM}{
        width: 80%;
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
const InfoDiv = styled.div`
    border: 2px solid #61ed84;
    border-radius: 10px;
    background-color: #575756;
    color: #61ed84;
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: 40% 55%;
    grid-template-rows: 25% 25% 25% 25%;
    column-gap: 5%;
    @media ${device.tablet}{
        width: 70%;
    }
    @media (max-width: 578px){
        width: 250px;
        grid-template-columns: 100%;
        grid-template-rows: 12% 12% 12% 12% 12% 12% 12% 12%;
    }
    @media ${device.mobileL}{
        width: 200px;
        margin-right: 10px;
    }
    @media ${device.mobileS}{
        margin-right: 5px;
        margin-left: 2px;
    }
`
const PropDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    @media ${device.tablet}{
        font-size: 0.8rem;
    }
    @media (max-width: 578px){
        justify-content: center;
    }
`
const DesDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: bold;
    font-size: 1.2rem;
    @media ${device.tablet}{
        font-size: 1rem;
    }
    @media (max-width: 578px){
        justify-content: center;
    }
`
const Header2 = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2.5rem;
    text-transform: uppercase;
    margin-bottom: 5%;
    @media ${device.tablet}{
        width: 90%;
        font-size: 2rem;
    }
    @media (max-width: 578px){
        font-size: 1.5rem;
    }
`
const Header3 = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2.5rem;
    text-transform: uppercase;
    margin-bottom: 2%;
    @media (max-width: 450px){
        font-size: 1.5rem;
    }
`
const ProfileComponent = () => {
    const [componentNum, setComponentNumber] = useState<boolean>(true);
    const auth = getAuth();
    const [user, setUser] = useState<User | null>();
    const [userInfo, setUserInfo] = useState<DocumentData>([]);
    const [docBoulders, setDocBoulders] = useState<DocumentData>([]);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    const redirectToHome = () => Router.push({
        pathname: '/'
    });

    const FilterData = (data: DocumentData, currentUser: User | null) => {
        let userSignedIn: DocumentData = {};
        Object.keys(data).map((key, index) => {
            const userDoc = data[key];
            if (currentUser?.uid == userDoc.uid) {
                userSignedIn = userDoc;
            }
        })
        return { userSignedIn }
    }

    useEffect(() => {
        onSnapshot(collection(db, "users"), snapshot => {
            const user = auth.currentUser;
            if (!user) {
                redirectToHome();
            }
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const filteredData: DocumentData = FilterData(data, user);
            if (data) {
                setUserInfo(filteredData.userSignedIn);
            }
        })
        onSnapshot(collection(db, "boulders"), snapshot => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (data) {
                setDocBoulders(data);
            }
        })
    }, []);
    const validate = Yup.object({
        firstName: Yup.string().max(15, "Maximálně 15 znaků"),
        lastName: Yup.string().max(20, "Maximálně 20 znaků"),
        nickname: Yup.string().max(15, "Maximálně 15 znaků"),
    })
    const updateUserDocument = async (values: DocumentData) => {
        const userDoc = doc(db, "users", userInfo.id);
        Object.keys(values).map((key, index) => {
            if (values[key] !== "") {
                updateDoc(userDoc, {
                    [key]: values[key]
                });
            }
        })
    }
    const sendVerificationEmail = () => {
        //@ts-ignore
        sendEmailVerification(auth.currentUser);
    }

    return (
        <>
            {componentNum ? (
                <ComponentDiv>
                    <HeaderDiv>Uživatel</HeaderDiv>
                    <MenuDiv>
                        <ButtonMenu onClick={() => (setComponentNumber(true))}>Informace o uživateli</ButtonMenu>
                        <ButtonMenu onClick={() => (setComponentNumber(false))}>Změna údajů</ButtonMenu>
                        {auth.currentUser?.emailVerified ? (
                            <ProfileFormModal values={docBoulders} />
                        ) : (
                            <ButtonMenu onClick={() => (sendVerificationEmail())}>Ověřit email</ButtonMenu>
                        )
                        }
                        {
                            userInfo.admin &&
                            <Link href="/admin">
                                <ButtonMenu>Admin</ButtonMenu>
                            </Link>
                        }

                    </MenuDiv>
                    <>
                        <ContentDiv>
                            <Header2>Informace</Header2>
                            <InfoDiv>
                                <DesDiv>Email: </DesDiv><PropDiv>{userInfo.email}</PropDiv>
                                <DesDiv>Jméno: </DesDiv><PropDiv>{userInfo.firstName}</PropDiv>
                                <DesDiv>Příjmení: </DesDiv><PropDiv>{userInfo.lastName}</PropDiv>
                                <DesDiv>Přezdívka: </DesDiv><PropDiv>{userInfo.nickname}</PropDiv>
                            </InfoDiv>
                        </ContentDiv>
                        <IconDiv>
                            <StyledImg src={logo.default.src} alt="Logo"></StyledImg>
                        </IconDiv>
                    </>
                </ComponentDiv>
            ) : (
                <ComponentDiv2>
                    <HeaderDiv>Uživatel</HeaderDiv>
                    <MenuDiv>
                        <ButtonMenu onClick={() => (setComponentNumber(true))}>Informace o uživateli</ButtonMenu>
                        <ButtonMenu onClick={() => (setComponentNumber(false))}>Změna údajů</ButtonMenu>
                        <ProfileFormModal values={docBoulders} />
                        {
                            userInfo.admin &&
                            <Link href="/admin">
                                <ButtonMenu>Admin</ButtonMenu>
                            </Link>
                        }
                    </MenuDiv>
                    <FormikContainer>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                nickname: '',
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                updateUserDocument(values);
                            }}
                        >
                            {formik => (
                                <>
                                    <Header3>Změnit údaje</Header3>
                                    <FormFormik>
                                        <TextFieldProfile label="Jméno" name="firstName" type="text" />
                                        <TextFieldProfile label="Příjmení" name="lastName" type="text" />
                                        <TextFieldProfile label="Přezdívka" name="nickname" type="text" />
                                        <ButtonContainer>
                                            <LoginButton type="submit">Změnit</LoginButton>
                                            <LoginButton type="reset">Resetovat</LoginButton>
                                            <ChangePasswordModal />
                                        </ButtonContainer>
                                    </FormFormik>
                                </>
                            )
                            }
                        </Formik>
                    </FormikContainer>
                </ComponentDiv2>
            )}
        </>
    )

}

export default ProfileComponent