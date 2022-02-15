import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Router from 'next/router';
import { collection, DocumentData, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';
import db, { auth } from '../utils/firebase';

const ReportDiv = styled.div`
    border: 2px solid black;
    width: 20%;
    height: 20%;
`
const AdminPanel = styled.div`
    width: 100%;
    height: 100%;
`
const AdminComponent = () => {
    const auth = getAuth();
    const [user, setUser] = useState<object | null>({});
    const [userInfo, setUserInfo] = useState<DocumentData>([]);
    const [reportDataWaiting, setReportDataWaiting] = useState<DocumentData>([]);
    const [reportDataInProcess, setReportDataInProcess] = useState<DocumentData>([]);
    //console.log("xx", reportData)
    const filterData = (data: DocumentData, currentUser: User | null) => {
        let userSignedIn: DocumentData = {};
        Object.keys(data).map((key, index) => {
            const userDoc = data[key];
            if (currentUser?.uid === userDoc.uid) {
                userSignedIn = userDoc;
            }
        })
        return { userSignedIn }
    }
    useEffect(() => {
        onSnapshot(collection(db, "users"), snapshot => {
            const user = auth.currentUser;

            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (data) {
                const filteredData: DocumentData = filterData(data, user);

                if (filteredData.userSignedIn.admin) {
                    setUserInfo(filteredData.userSignedIn);
                }
                else redirectToHome();
            }
        })
        onSnapshot(collection(db, "reports"), snapshot => {
            const data: DocumentData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(data)
            if (data) {
                let waiting: DocumentData = [];
                let inProcess: DocumentData = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === "waiting") {
                        waiting.push(data[i]);
                    }
                    else if (data[i].status === "inProcess") {
                        inProcess.push(data[i]);
                    }
                }

                setReportDataWaiting(waiting);
                setReportDataInProcess(inProcess);
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
    const changeStatusToProcess = async(id:string) => {
        const reportRef = doc(db, "reports", id);
        await updateDoc(reportRef,{
            status: "inProcess"
        });
    }
    const deleteReport = async (id:string) =>{
        await deleteDoc(doc(db, "reports", id));
    }
    if (userInfo.admin) {
        return (
            <AdminPanel>
                <div>AdminComponent</div>
                <div>
                    <div>Waiting</div>
                    <div>
                        {
                            Object.keys(reportDataWaiting).map((key) => {
                                const report = reportDataWaiting[key];
                                console.log("x",report)
                                return (
                                    <ReportDiv>
                                        <div>id reportu: {report.id}</div>
                                        <div>id reportované oblasti: {report.locationId}</div>
                                        <div>id reportované cesty: {report.routeId}</div>
                                        <div>id uživatele, který reportovaů: {report.reportedBy}</div>
                                        <div>zpráva reportu: {report.reportText}</div>
                                        <button onClick={()=>changeStatusToProcess(report.id)}>To Process</button>
                                    </ReportDiv>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div>InProcess</div>
                    <div>
                        {
                            Object.keys(reportDataInProcess).map((key) => {
                                const report = reportDataInProcess[key];
                                return (
                                    <ReportDiv>
                                        <div>id reportu: {report.id}</div>
                                        <div>id reportované oblasti: {report.locationId}</div>
                                        <div>id reportované cesty: {report.routeId}</div>
                                        <div>id uživatele, který reportovaů: {report.reportedBy}</div>
                                        <div>zpráva reportu: {report.reportText}</div>
                                        <button onClick={()=>deleteReport(report.id)}>Fixed</button>
                                    </ReportDiv>
                                )
                            })
                        }
                    </div>
                </div>
            </AdminPanel>

        )
    }
    else return (
        <div>
            waiting...
        </div>
    )
}

export default AdminComponent