import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from  'firebase/firestore'


const firebaseConfig = {

    apiKey: "AIzaSyBzPaEp5agYxrUMKXr9_Dy5GgIgA0v7-xY",
  
    authDomain: "shelfmade-a39e4.firebaseapp.com",
  
    projectId: "shelfmade-a39e4",
  
    storageBucket: "shelfmade-a39e4.appspot.com",
  
    messagingSenderId: "590021488249",
  
    appId: "1:590021488249:web:34c31224e0ca9c86c2eea8",
  
    measurementId: "G-T1WKK61GR5"
  
  };
  
  


const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore()

const getAll = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.forEach((doc) => {
    
    const items = JSON.stringify(doc.data())
    
     return (JSON.parse(items));
});
    
}

export default getAll
