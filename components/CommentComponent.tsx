import { Formik, Form } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import CommentTextField from './formikFields/CommentTextField'
import { useRouter } from "next/router";
import { addDoc,doc, DocumentData, setDoc, Timestamp, arrayUnion } from 'firebase/firestore'
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
const CommentComponent = () => {
    const auth = getAuth();
    const router = useRouter();
    const { route } = router.query;
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
                    commentId : generateID(),
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