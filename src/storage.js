// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage,ref,uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRlXvoPjd_RmwEgBz-CSyaTC404H1MbHk",
  authDomain: "college-connect-8fa77.firebaseapp.com",
  projectId: "college-connect-8fa77",
  storageBucket: "college-connect-8fa77.appspot.com",
  messagingSenderId: "465146751702",
  appId: "1:465146751702:web:66a16ff9d783c67b797777",
  measurementId: "G-0KGT1JBTB4"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);


// Create file metadata including the content type
/** @type {any} */

// Upload the file and metadata
export const uploadFile = async (file,metadata) => {
    var filename = uuidv4();
    const storageRef = ref(storage, filename);
    console.log('uploading this file',file);
    var result = await uploadBytes(storageRef, file, metadata);
    return result;
      
}


export async function uploadFiles(files) {
  let urlFront = 'https://firebasestorage.googleapis.com/v0/b/college-connect-8fa77.appspot.com/o/'
  let urlLast = '?alt=media'
  let fileUrls = []
  for(var file of files) {
    let metadata = {
      contentType: file.type
    }
    let result = await uploadFile(file, metadata)
    let completeUrl = urlFront + result.metadata.fullPath +urlLast
    fileUrls.push(completeUrl)
  }
  return fileUrls;
}