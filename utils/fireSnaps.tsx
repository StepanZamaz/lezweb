import React from "react";
import { collection, onSnapshot, DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../utils/firebase";

const [boulders, setBoulders] = useState<DocumentData>([]);
 

onSnapshot(collection(db,"boulders"), snapshot=>{
    const data = snapshot.docs.map((doc) => ({...doc.data()}));
    if(data){
        setBoulders(data);
    }
})