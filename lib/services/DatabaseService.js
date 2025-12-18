import { ref, set, onValue, remove, update } from "firebase/database";
import { db } from "../init-firebase";

// Interfaz abstracta para operaciones de base de datos
const DatabaseService = {
  async get(path) {
    const reference = ref(db, path);
    return new Promise((resolve, reject) => {
      onValue(
        reference,
        (snapshot) => resolve(snapshot.val()),
        (error) => reject(error),
        { onlyOnce: true }
      );
    });
  },

  async set(path, data) {
    const reference = ref(db, path);
    return set(reference, data);
  },

  async update(path, data) {
    const reference = ref(db, path);
    return update(reference, data);
  },

  async remove(path) {
    const reference = ref(db, path);
    return remove(reference);
  },

  subscribe(path, callback) {
    const reference = ref(db, path);
    const unsubscribe = onValue(reference, (snapshot) => {
      callback(snapshot.val());
    });
    return unsubscribe;
  },
};

export default DatabaseService;
