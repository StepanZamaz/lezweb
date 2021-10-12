import { NextPage } from 'next';
import Link from 'next/link';
import { collection, onSnapshot, DocumentData, } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../utils/firebase";
const ListLoc: NextPage = () =>{
    const[boulders, setBoulders] = useState<DocumentData>([]);
    useEffect(()=>{
        onSnapshot(collection(db,"boulders"), snapshot=>{
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            if(data){
                setBoulders(data);
            }
        })
    },[]);
    return(
        <>
        <div>
            <h1>Climberry</h1>
            <ul>
            {Object.keys(boulders).map(function(key, index){
                const oblast = boulders[key];
                return(
                    <Link href="/[locations]" as={`/${oblast.id}`} key={oblast.id}>
                        <li>{oblast.nazevOblasti}</li>
                    </Link>
                )
            })
            }
            </ul>
        </div>
        </>
    )
}
export default ListLoc;