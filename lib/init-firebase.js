import { initializeApp } from "firebase/app";
import { getDatabase, set } from "firebase/database";
import { ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpSkqfV50SjlthQDa4xY3ludNjIi7E7jE",
  authDomain: "prioribox-e6d9d.firebaseapp.com",
  projectId: "prioribox-e6d9d",
  storageBucket: "prioribox-e6d9d.appspot.com",
  messagingSenderId: "638157444296",
  appId: "1:638157444296:web:3bf139f3a2457b244f41fd",
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
