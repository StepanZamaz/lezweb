import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import CommentTextField from './formikFields/CommentTextField'
import { useRouter } from "next/router";
import { addDoc, doc, DocumentData, setDoc, Timestamp, arrayUnion, onSnapshot, collection } from 'firebase/firestore'
import db, { auth } from "../utils/firebase";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import dateFormat from 'dateformat'
import { device } from './styledComponents/device'
const CommentSection = styled.div`
    border-top: 4px solid #61ed84;
    grid-area: comment;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    margin: 2%;
    padding: 1%;
`
const CommentHeading = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 3%;
    @media ${device.laptop}{
        font-size: 1.5em;
    }
    @media ${device.mobileL}{
        font-size: 1.1em;
    }
`
const DisplayComment = styled.div`
    width: 70%;
    border-radius: 15px 0 0 15px;
    border: 2px solid #61ed84;
    background-color: #323232;
    display: block;
    height: 200px;
    overflow-y: scroll;
    padding-left: 2.5%;
    padding-right: 2.5%;
    @media ${device.tablet}{
        width: 90%;
    }
`
const DivInputComment = styled.div`
    width: 70%;
    @media ${device.tablet}{
        width: 90%;
    }
    @media ${device.mobileL}{
        height: 200px;
    }
`
const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: row;
    @media ${device.mobileL}{
        flex-direction: column;
    }
`
const ButtonContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 600px){
        width: 30%;
    }
    @media ${device.mobileL}{
        width: 100%;
    }
`
const AddCommentBtn = styled.button`
    background-color: #61ed84;
    text-transform: uppercase;
    font-size: 0.8em;
    width: 90%;
    height: 60%;
    border: none;
    color: #000;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    :hover {
        background-color: rgb(41, 153, 72);
    }
    @media ${device.laptopL}{
        font-size: 0.6em;
    }
    @media ${device.laptop}{
        border-radius: 1rem;
        width: 95%;
        font-size: 0.5em;
    }
    @media ${device.mobileL}{
        width: 30%;
        height: 50px;
    }
`
const CommentDiv = styled.div`
    border-bottom: 2px solid #61ed84;
    padding-top: 2%;
    padding-bottom: 2%;
    min-height: 50%;
    height: auto;
`
const CommentHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.9em;
    @media ${device.laptop}{
        font-size: 0.8em;
    }
    @media (max-width: 600px){
        font-size: 0.75em;
    }
    @media ${device.mobileL}{
        flex-direction: column;
        height: 35px;
    }
`
const CommentText = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 75%;
    font-size: 1.1em;
    @media ${device.laptop}{
        font-size: 0.9em;
    }
    
`
const DateDiv = styled.div`
    
`
const NameDiv = styled.div`
    
`
const CommentComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>();
    const [comments, setComments] = useState<DocumentData>({})
    const [users, setUsers] = useState<DocumentData>({})
    const { route } = router.query;
    useEffect(() => {
        onSnapshot(collection(db, "comments"), snapshot => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const listedData = data?.find(x => x.id === route);
            if (listedData) {
                setComments(listedData);
            }
        })
        onSnapshot(collection(db, "users"), snapshot => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (data) {
                setUsers(data);
            }
        })
    }, [route]);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    const validate = Yup.object({
        commentText: Yup.string().max(200, "Maximálně 200 znaků").required('Vyžadováno'),
    })
    var generateID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const addComment = async (data: DocumentData) => {
        //@ts-ignore
        let routeId: string = route;

        const commentRef = doc(db, "comments", routeId);
        await setDoc(commentRef, {
            comment: arrayUnion(
                {
                    commentId: generateID(),
                    commentText: data.commentText,
                    addedBy: auth.currentUser?.uid,
                    addDate: Timestamp.fromDate(new Date())
                }
            )
        }, { merge: true });
    }
    return (
        <CommentSection>
            <CommentHeading>Komentáře</CommentHeading>
            <DisplayComment>
                {
                    comments.comment === undefined ? (
                        <div>
                            no comment
                        </div>

                    ) : (
                        <>
                            {
                                Object.keys(comments.comment).map((key) => {
                                    const singleComment = comments.comment[key];
                                    const date = comments.comment[key].addDate.toDate().toString();
                                    return (
                                        <>
                                            {
                                                Object.keys(users).map((key) => {
                                                    const user = users[key];
                                                    if (user.uid === singleComment.addedBy) {
                                                        return (
                                                            <CommentDiv>
                                                                <CommentHeader>
                                                                    <NameDiv>{user.firstName} {user.lastName}</NameDiv>
                                                                    <DateDiv>{dateFormat(date)}</DateDiv>
                                                                </CommentHeader>
                                                                <CommentText>{singleComment.commentText}</CommentText>
                                                            </CommentDiv>
                                                        )
                                                    }

                                                })
                                            }
                                        </>
                                    )


                                })
                            }
                        </>
                    )

                }
            </DisplayComment>
            {user?.emailVerified ? (
                <>
                    <DivInputComment>
                        <Formik
                            initialValues={{
                                commentText: ''
                            }}
                            validationSchema={validate}
                            onSubmit={(values, { resetForm }) => {
                                addComment(values);
                                setTimeout(()=>(resetForm()),500); 
                            }}
                        >
                            {formik => (
                                <>
                                    <StyledForm>
                                        <CommentTextField label="Napište něco..." name="commentText" type="text" />
                                        <ButtonContainer>
                                            <AddCommentBtn type="submit">Přidat komentář</AddCommentBtn>
                                        </ButtonContainer>
                                    </StyledForm>
                                </>
                            )}
                        </Formik>
                    </DivInputComment>
                </>
            ) : (
                <>
                </>
            )}

        </CommentSection>
    )
}

export default CommentComponent