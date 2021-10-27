import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from "../utils/firebase";
const FirestoreCollection = () =>{
    const [value, loading, error] = useCollection(
        collection(db,"boulders"),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
      console.log(value);
}
export default FirestoreCollection;