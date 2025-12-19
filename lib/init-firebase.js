import { initializeApp } from "firebase/app";
import { getDatabase, set } from "firebase/database";
import { ref } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);

// # ejemplo de como usar la base de datos
// const list = {
//   salud: {
//     description: "mi salud",
//     items: [
//       {
//         name: "tomar vitaminas",
//         priority: "alto",
//         type: "deseo",
//       },

//       {
//         name: "revisar calendario",
//         priority: "bajo",
//         type: "deseo",
//       },
//     ],
//   },
//   mama: {
//     description: "listado de cosas de mama",
//     items: [
//       {
//         name: "comprar regalos",
//         priority: "bajo",
//         type: "deseo",
//       },
//       {
//         name: "ir al doc",
//         priority: "alto",
//         type: "deseo",
//       },
//     ],
//   },
//   casa: {
//     description: "listado de cosas de casa",
//     items: [
//       {
//         name: "cambiar cables",
//         priority: "alto",
//         type: "necesidad",
//       },
//       {
//         name: "revisar grifo viejo",
//         priority: "alto",
//         type: "necesidad",
//       },
//     ],
//   },
// };

// # crea un array de objetos con los datos de cada lista
// set(ref(db, "/listas"), list);

// # actualiza un item de una lista
// update(ref(db, "/listas/casa/items/0"), { name: "hola" });

// # borra un item de una lista
// remove(ref(db, "/listas/casa/items/0"))
