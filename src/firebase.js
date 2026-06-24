
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { 
    addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDSWefUTQBcOC0uc3ouCGzSNCiZr5WMJOc",
  authDomain: "netflix-clone-4926b.firebaseapp.com",
  projectId: "netflix-clone-4926b",
  storageBucket: "netflix-clone-4926b.firebasestorage.app",
  messagingSenderId: "361727257805",
  appId: "1:361727257805:web:4ceb301832df1342270d84",
  measurementId: "G-WD8NG9DKZM"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async  (name, email, password)=>{
  try {
    const response = await createUserWithEmailAndPassword(auth,email, password);
    const user = response.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,

    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-'));
    
  }
}

const login = async (email, password)=>{
 try {
    await signInWithEmailAndPassword(auth, email, password)
 } catch (error) {
    console.log(error);
    toast.error(error.code);
 }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};