import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpSkqfV50SjlthQDa4xY3ludNjIi7E7jE",
  authDomain: "prioribox-e6d9d.firebaseapp.com",
  projectId: "prioribox-e6d9d",
  databaseURL: "https://prioribox-e6d9d-default-rtdb.firebaseio.com",
  storageBucket: "prioribox-e6d9d.appspot.com",
  messagingSenderId: "638157444296",
  appId: "1:638157444296:web:3bf139f3a2457b244f41fd",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);
