import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Router from 'next/router';
import { collection, DocumentData, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';
import db, { auth } from '../utils/firebase';
import { AiOutlineFileSearch, AiOutlineFileSync } from "react-icons/ai"
import ReactLoading from 'react-loading';
import dateFormat from 'dateformat'
import { device } from './styledComponents/device'
const ReportDiv = styled.div`
    border: 2px solid black;
    width: 500px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const AdminPanel = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    @media ${device.laptop} { 
        flex-direction: column;
    }
`
const SideBar = styled.div`
    height: 100vh;
    width: 10vw;
    top: 0;
    left: 0;
    border-right: 2px solid black;
    position: fixed;
    background-color: white;
    @media ${device.laptop} { 
        position: fixed;
        height: 100px;
        width: 100%;
        top:0;
        left: 0;
        right:0;
        display: flex;
        flex-direction: row;
        border-right: none;
        border-bottom: 2px solid black;
    }
`
const Wraper = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    @media ${device.laptop} {
        height: 100px;
        width: 50%;
        flex-direction: row;
        justify-content: center;
    }
`
const InProcessIco = styled(AiOutlineFileSearch)`
    width: 100%;
    font-size: 6em;
    border-bottom: 2px solid black;
    :hover {
        cursor: pointer;
    }
    @media ${device.laptop} {
        border-bottom: none;
        border-left: 2px solid black;
    }
    @media ${device.tablet} {
        font-size: 4em;
    }
`
const WaitingIco = styled(AiOutlineFileSync)`
    width: 100%;
    font-size: 6em;
    border-bottom: 2px solid black;
    :hover {
        cursor: pointer;
    }
    @media ${device.laptop} {
        border-bottom: none;
        border-left: 2px solid black;
    }
    @media ${device.tablet} {
        font-size: 4em;
    }
`
const ContentDiv = styled.div`
    width: 90vw;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10vw;
    @media ${device.laptop} {
        margin-left: 0;
        margin-top: 100px;
        width: 100%;
    }
`
const AdminHeading = styled.div`
    font-size: 2em;
    width: 100%;
    height: 75px;
    border-bottom: 2px solid black;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${device.laptop} {
        height: 100px;
        width: 50%;
        border-bottom: none;
    }
`
const ReportHeading = styled.div`
    width: 90vw;
    height: 75px;
    font-size: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid black;
    margin-bottom: 5%;
    @media ${device.laptop} {
        width: 100%;
        font-size: 4vh;
    }
`
const CenterLoading = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 15%;
    background-color: #323232;
`
const AlignDiv = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    row-gap: 5vh;
    column-gap: 5vw;
    flex-wrap: wrap;
`
const ReportRow = styled.div`
    display: flex;
    justify-content: center;
    @media ${device.mobileL} {
        font-size: 0.8em;
    }
`
const ReportButton = styled.div`
    border: none;
    background-color: #000;
    color: #fff;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    padding: 2%;
`
const AdminComponent = () => {
    const auth = getAuth();
    const [user, setUser] = useState<object | null>({});
    const [userInfo, setUserInfo] = useState<DocumentData>([]);
    const [reportDataWaiting, setReportDataWaiting] = useState<DocumentData>([]);
    const [reportDataInProcess, setReportDataInProcess] = useState<DocumentData>([]);
    const [content, setContent] = useState<boolean>(true);
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
    const changeStatusToProcess = async (id: string) => {
        const reportRef = doc(db, "reports", id);
        await updateDoc(reportRef, {
            status: "inProcess"
        });
    }
    const deleteReport = async (id: string) => {
        await deleteDoc(doc(db, "reports", id));
    }
    if (userInfo.admin) {
        
        return (
            <AdminPanel>
                <SideBar>
                    <AdminHeading>Admin</AdminHeading>
                    <Wraper>
                        <WaitingIco onClick={() => setContent(true)} />
                        <InProcessIco onClick={() => setContent(false)} />
                    </Wraper>
                </SideBar>
                <ContentDiv>
                    {
                        content ? (
                            <>
                                <ReportHeading>Waiting</ReportHeading>
                                <AlignDiv>
                                {
                                    Object.keys(reportDataWaiting).map((key) => {
                                        const report = reportDataWaiting[key];
                                        const date = report.addDate.toDate().toString();
                                        return (
                                            <ReportDiv>
                                                <ReportRow>Den a čas reportu: {dateFormat(date)}</ReportRow>
                                                <ReportRow>Id reportu: {report.id}</ReportRow>
                                                <ReportRow>Id reportované oblasti: {report.locationId}</ReportRow>
                                                <ReportRow>Id reportované cesty: {report.routeId}</ReportRow>
                                                <ReportRow>Id uživatele, který reportoval: {report.reportedBy}</ReportRow>
                                                <ReportRow>Text reportu: {report.reportText}</ReportRow>
                                                <ReportRow>
                                                    <ReportButton onClick={() => changeStatusToProcess(report.id)}>To Process</ReportButton>
                                                </ReportRow>
                                            </ReportDiv>
                                        )
                                    })
                                }
                                </AlignDiv>
                            </>
                        ) : (
                            <>
                                <ReportHeading>InProcess</ReportHeading>
                                <AlignDiv>
                                {
                                    Object.keys(reportDataInProcess).map((key) => {
                                        const report = reportDataInProcess[key];
                                        const date = report.addDate.toDate().toString();
                                        return (
                                            <ReportDiv>
                                                <ReportRow>Den a čas reportu: {dateFormat(date)}</ReportRow>
                                                <ReportRow>Id reportu: {report.id}</ReportRow>
                                                <ReportRow>Id reportované oblasti: {report.locationId}</ReportRow>
                                                <ReportRow>Id reportované cesty: {report.routeId}</ReportRow>
                                                <ReportRow>Id uživatele, který reportoval: {report.reportedBy}</ReportRow>
                                                <ReportRow>Text reportu: {report.reportText}</ReportRow>
                                                <ReportRow>
                                                    <ReportButton onClick={() => deleteReport(report.id)}>Fixed</ReportButton>
                                                </ReportRow>
                                            </ReportDiv>
                                        )
                                    })
                                }
                                </AlignDiv>
                            </>
                        )
                    }
                </ContentDiv>
            </AdminPanel>

        )
    }
    else return (
        <CenterLoading>
            <ReactLoading type={'spokes'} color={"#61ed84"}  width={'20vw'}></ReactLoading>
        </CenterLoading>
    )
}

export default AdminComponent