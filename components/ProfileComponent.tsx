import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAuth, onAuthStateChanged, updateProfile, User } from "firebase/auth";
import db, { auth } from '../utils/firebase';
import { collection, DocumentData, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Router from 'next/router';
import * as Yup from 'yup'
import { Formik, Form } from "formik"
import TextFieldProfile from './formikFields/TextFieldProfile';
import Link from 'next/link';
import ProfileFormModal from './modals/ProfileFormModal'
import ChangePasswordModal from './modals/ChangePasswordModal'

const logo = require('../public/logo.png');

const ComponentDiv = styled.div`
    display: grid;
    grid-template-columns: 30% 30% 20% 20%;
    grid-template-rows: 4vh 8vh 30vh;
    grid-template-areas: 
    "header header header header"
    "button button button button"
    "main main other other";
    row-gap: 10%;
`
const ComponentDiv2 = styled.div`
    display: grid;
    grid-template-columns: 30% 30% 20% 20%;
    grid-template-rows: 4vh 8vh 45vh;
    grid-template-areas: 
    "header header header header"
    "button button button button"
    "main main main main";
    row-gap: 7%;
`
const ContentDiv = styled.div`
    grid-area: main;
    width: 100%;
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
`
const MenuDiv = styled.div`
    grid-area: button;
    display:flex;
    justify-content: space-around;
    border-bottom: 5px solid black;
`
const HeaderDiv = styled.div`
    grid-area: header;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
`
const ButtonContainer = styled.div`
    margin: 1rem 0 1rem 0;
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
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
`
const FormikContainer = styled.div`
    height: 100%;
    width: 100%;
    grid-area: main;
`
const FormFormik = styled(Form)`
    height: 100%;
    width: 100%;
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
`
const PropDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`
const DesDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: bold;
    font-size: 1.2rem;
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
`
const ProfileComponent = () => {
    const [componentNum, setComponentNumber] = useState<boolean>(true);
    const auth = getAuth();
    const [user, setUser] = useState<object | null>({});
    const [userInfo, setUserInfo] = useState<DocumentData>([]);
    const [docBoulders, setDocBoulders] = useState<DocumentData>([]);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // @ts-ignore
        if (!user) {
            redirectToHome();
        }
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
            console.log("xxx", user)
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
    return (
        <>
            {componentNum ? (
                <ComponentDiv>
                    <HeaderDiv>Uživatel</HeaderDiv>
                    <MenuDiv>
                        <ButtonMenu onClick={() => (setComponentNumber(true))}>Informace o uživateli</ButtonMenu>
                        <ButtonMenu onClick={() => (setComponentNumber(false))}>Změna údajů</ButtonMenu>
                        <ProfileFormModal values={docBoulders} />
                        <Link href="/admin">
                            <ButtonMenu>Admin</ButtonMenu>
                        </Link>
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
                        <Link href="/admin">
                            <ButtonMenu>Admin</ButtonMenu>
                        </Link>
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
                                        <TextFieldProfile label="First Name" name="firstName" type="text" />
                                        <TextFieldProfile label="Last Name" name="lastName" type="text" />
                                        <TextFieldProfile label="Nickname" name="nickname" type="text" />
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
/*
{
                componentNum === 0 ?(
                    <ContentDiv>
                        <p>{userInfo.email}</p>
                        <p>{userInfo.firstName}</p>
                        <p>{userInfo.lastName}</p>
                    </ContentDiv>
                ): componentNum === 1 ?(
                    <div>
                        zmenaUdaju
                    </div>
                ): componentNum === 2 ?(
                    <div>
                        pridatoblasti
                    </div>
                ): componentNum ===3 ?(
                    <div>
                        admin
                    </div>
                )}
                updateProfile(auth.currentUser, {
            dataToAdd
        
        }).then(() => {
            // Profile updated!
            // ...
            console.log("update");
          }).catch((error) => {
            // An error occurred
            // ...
            console.log(error)
          });
const ContentDiv = styled.div`
    grid-area: main;
    display: grid;
    grid-template-columns: 20% 20% 30% 30%;
    grid-template-rows: 20% 20% 20% 20%;
    grid-template-areas: 
    "info1 prop1 . ."
    "info2 prop2 . ."
    "info3 prop3 . ."
    "info4 prop4 . .";
`
const Info1 = styled.div`
    grid-area: info1;
`
const Prop1 = styled.div`
    grid-area: prop1;
`
const Info2 = styled.div`
    grid-area: info2;
`
const Prop2 = styled.div`
    grid-area: prop2;
`
const Info3 = styled.div`
    grid-area: info3;
`
const Prop3 = styled.div`
    grid-area: prop3;
`
const Info4 = styled.div`
    grid-area: info4;
`
const Prop4 = styled.div`
    grid-area: prop4;
`
          
<ComponentDiv>
            <HeaderDiv>Uživatel</HeaderDiv>
            <MenuDiv>
                <ButtonMenu onClick={() => (setComponentNumber(true))}>Informace o uživateli</ButtonMenu>
                <ButtonMenu onClick={() => (setComponentNumber(false))}>Změna údajů</ButtonMenu>
                <ProfileFormModal values={docBoulders} />
                <Link href="/admin">
                    <ButtonMenu>Admin</ButtonMenu>
                </Link>
            </MenuDiv>
            <>
                {componentNum ? (
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
                ) : (
                    <>
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
                                        <h1>Změna udaju</h1>
                                        <FormFormik>
                                            <TextFieldProfile label="First Name" name="firstName" type="text" />
                                            <TextFieldProfile label="Last Name" name="lastName" type="text" />
                                            <TextFieldProfile label="Nickname" name="nickname" type="text" />
                                            <ButtonContainer>
                                                <LoginButton type="submit">Změnit</LoginButton>
                                                <LoginButton type="reset">Resetovat</LoginButton>
                                            </ButtonContainer>
                                        </FormFormik>
                                    </>
                                )
                                }
                            </Formik>
                        </FormikContainer>
                        <ChangePasswordModal />
                    </>
                )}
            </>
        </ComponentDiv>



*/