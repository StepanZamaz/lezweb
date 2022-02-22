import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import CommentTextField from './formikFields/CommentTextField'
import { useRouter } from "next/router";
import { addDoc, doc, DocumentData, setDoc, Timestamp, arrayUnion, onSnapshot, collection } from 'firebase/firestore'
import db from "../utils/firebase";
import { getAuth } from 'firebase/auth'
const CommentSection = styled.div`
    
`
const CommentHeading = styled.div`
    
`
const DisplayComment = styled.div`
    
`
const DivInputComment = styled.div`
    
`
const StyledForm = styled(Form)`

`
const ButtonContainer = styled.div`
    
`
const AddCommentBtn = styled.button`
    
`
const CommentDiv = styled.div`
    border: 2px solid black;
    width: 50%;
    margin: 0;
`
const CommentComponent = () => {
    const auth = getAuth();
    const router = useRouter();
    const [comments, setComments] = useState<DocumentData>({})
    console.log("comments", comments)
    const { route } = router.query;
    useEffect(() => {
        console.log("ahoj")
        onSnapshot(collection(db, "comments"), snapshot => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log("data", data)
            const listedData = data?.find(x => x.id === route);
            if (listedData) {
                setComments(listedData);
            }
        })
    }, [route]);
    const validate = Yup.object({
        commentText: Yup.string().max(100, "Maximálně 100 znaků").required('Vyžadováno'),
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
                                    //const date = singleComment.addDate;
                                    console.log("x", comments.comment[key]);
                                    return (
                                        <CommentDiv>
                                            <ul>
                                                <li>datum: { }</li>
                                                <li>idUser: {singleComment.addedBy}</li>
                                                <li>idComment: {singleComment.commentId}</li>
                                                <li>commentText: {singleComment.commentText}</li>
                                            </ul>
                                        </CommentDiv>
                                    )
                                })
                            }
                        </>
                    )

                }
            </DisplayComment>
            <DivInputComment>
                <Formik
                    initialValues={{
                        commentText: ''
                    }}
                    validationSchema={validate}
                    onSubmit={values => {
                        addComment(values);
                    }}
                >
                    {formik => (
                        <>
                            <StyledForm>
                                <CommentTextField label="Přidat komentář" name="commentText" type="text" />
                                <ButtonContainer>
                                    <AddCommentBtn type="submit">Přidat komentář</AddCommentBtn>
                                </ButtonContainer>
                            </StyledForm>
                        </>
                    )}
                </Formik>
            </DivInputComment>
        </CommentSection>
    )
}

export default CommentComponent