import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAuth, onAuthStateChanged, updateProfile, User } from "firebase/auth";
import db, { auth } from '../utils/firebase';
import { collection, DocumentData, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Router from 'next/router';
import * as Yup from 'yup'
import { Formik, Form } from "formik"
import TextFieldProfile from './TextFieldProfile';
import Link from 'next/link';
import ProfileFormModal from './modals/ProfileFormModal'
import ChangePasswordModal from './modals/ChangePasswordModal'
const ComponentDiv = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 5vh 40vh;
    grid-template-areas: 
    "header header"
    "sidebar main";
`
const ContentDiv = styled.div`
    grid-area: main;
`
const MenuDiv = styled.div`
    grid-area: sidebar;
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
const FormikContainer = styled.div`
    height: 100%;
`
const FormFormik = styled(Form)`
    
`
const ProfileComponent = () => {
    const [componentNum, setComponentNumber] = useState<boolean>(true);
    const auth = getAuth();
    const [user, setUser] = useState<object | null>({});
    const [userInfo, setUserInfo] = useState<DocumentData>([]);
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
        <ComponentDiv>
            <HeaderDiv>Uživatel</HeaderDiv>
            <MenuDiv>
                <ul>
                    <li onClick={() => (setComponentNumber(true))}>Informace o uživateli</li>
                    <li onClick={() => (setComponentNumber(false))}>Změna údajů</li>
                    <li><ProfileFormModal /></li>
                    <Link href="/admin">
                        <li>Admin</li>
                    </Link>
                </ul>
            </MenuDiv>
            <>
                {componentNum ? (
                    <ContentDiv>
                        <p>{userInfo.email}</p>
                        <p>{userInfo.firstName}</p>
                        <p>{userInfo.lastName}</p>
                        <p>{userInfo.nickname}</p>
                        <p>{userInfo.uid}</p>
                    </ContentDiv>
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
                        <ChangePasswordModal/>
                    </>
                )}
            </>
        </ComponentDiv>
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
*/