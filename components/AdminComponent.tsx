import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import  Router  from 'next/router';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import db, { auth } from '../utils/firebase';
const AdminComponent = () => {
    const auth = getAuth();
    const [user, setUser] = useState<object | null>({});
    const [userInfo, setUserInfo] = useState<DocumentData>([]);
    console.log("xx",userInfo)
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
            if (data) {
                const filteredData: DocumentData = FilterData(data, user);
                console.log("x", filteredData)
                if(filteredData.userSignedIn.admin){
                    setUserInfo(filteredData.userSignedIn);
                }
                else redirectToHome();
            }
        })
    }, []);
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

    if(userInfo.admin){
        return (
            <div>AdminComponent</div>
        )
    }
    else return (
        <div>
            waiting...
        </div>
    )
}

export default AdminComponent