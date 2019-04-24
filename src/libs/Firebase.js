import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyD0kzfU8my-oAPn5llyqPzCk2hEIX_Q7yg",
	authDomain: "fir-chatting-app-47fbc.firebaseapp.com",
	databaseURL: "https://fir-chatting-app-47fbc.firebaseio.com",
	projectId: "fir-chatting-app-47fbc",
	storageBucket: "fir-chatting-app-47fbc.appspot.com",
	messagingSenderId: "842686553650"
};


const app = firebase.initializeApp(config)

console.log('firebase init');

export default firebase

export const db = firebase.firestore(app)
