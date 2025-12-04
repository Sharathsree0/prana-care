/* eslint-disable no-useless-catch */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, doc,  setDoc, getDoc, getDocs,  updateDoc, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDPoz3EmMMxIvTDbeFlF6LjbalnMfHhZG0",
  authDomain: "prana-care.firebaseapp.com",
  projectId: "prana-care",
  storageBucket: "prana-care.firebasestorage.app",
  messagingSenderId: "1062637887294",
  appId: "1:1062637887294:web:120f63417739030b33d66f",
  measurementId: "G-WMPY9G8EHT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);


// Google login function
const dbs = {
	addDocument: async (collectionName, documentId, data) => {
		try {
			await setDoc(doc(db, collectionName, documentId), data);
			// console.log(`Document written with ID: ${documentId}`);
		} catch (e) {
			// console.error('Error adding document: ', e);
			throw e;
		}
	},

	readDocument: async (collectionName, documentId) => {
		const docRef = doc(db, collectionName, documentId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			return docSnap.data();
		} else {
			console.log('No such document!');
			return null;
		}
	},

	readCollection: async (collectionName) => {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const data = [];
		querySnapshot.forEach((doc) => {
			data.push({ id: doc.id, ...doc.data() });
		});
        console.log(data)
		return data;
	},

	sortCollection: async (collectionName, field, direction = 'asc') => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, orderBy(field, direction));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (sorted by ${field} ${direction})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error sorting collection:', error);
			throw error;
		}
	},

	whereCollection: async (collectionName, field, operator, value) => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, where(field, operator, value));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (filtered where ${field} ${operator} ${value})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error filtering collection:', error);
			throw error;
		}
	},
	whereAndSortCollection: async (collectionName, fieldWhere, operator, valueWhere, fieldOrder, directionOrder = 'asc') => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, where(fieldWhere, operator, valueWhere), orderBy(fieldOrder, directionOrder));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (filtered where ${fieldWhere} ${operator} ${valueWhere}, sorted by ${fieldOrder} ${directionOrder})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error filtering and sorting collection:', error);
			throw error;
		}
	},

	updateDocument: async (collectionName, documentId, data) => {
		const docRef = doc(db, collectionName, documentId);

		try {
			await updateDoc(docRef, data);
			console.log('Document updated successfully');
		} catch (e) {
			console.error('Error updating document: ', e);
			throw e;
		}
	},

	updateOrSetDocument: async (collectionName, documentId, data) => {
		const docRef = doc(db, collectionName, documentId);

		try {
			await setDoc(docRef, data, { merge: true });
			console.log('Document updated or set successfully');
		} catch (e) {
			console.error('Error updating or setting document: ', e);
			throw e;
		}
	},

	deleteDocument: async (collectionName, documentId) => {
		try {
			await deleteDoc(doc(db, collectionName, documentId));
			console.log('Document deleted successfully');
		} catch (e) {
			console.error('Error deleting document: ', e);
			throw e;
		}
	}
};

export default dbs;