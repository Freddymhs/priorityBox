#!/usr/bin/env node

// Script para inicializar Firebase Realtime Database con datos de ejemplo
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpSkqfV50SjlthQDa4xY3ludNjIi7E7jE",
  authDomain: "prioribox-e6d9d.firebaseapp.com",
  projectId: "prioribox-e6d9d",
  storageBucket: "prioribox-e6d9d.appspot.com",
  messagingSenderId: "638157444296",
  appId: "1:638157444296:web:3bf139f3a2457b244f41fd",
};

// Datos iniciales de ejemplo
const datosIniciales = {
  trabajo: {
    description: "Tareas relacionadas con el trabajo",
    items: [
      {
        name: "Revisar emails importantes",
        priority: "alto",
        type: "necesidad",
      },
      {
        name: "Preparar presentación",
        priority: "alto",
        type: "necesidad",
      },
      {
        name: "Organizar escritorio",
        priority: "bajo",
        type: "deseo",
      },
    ],
  },
  personal: {
    description: "Tareas personales y del hogar",
    items: [
      {
        name: "Hacer ejercicio",
        priority: "alto",
        type: "deseo",
      },
      {
        name: "Comprar víveres",
        priority: "alto",
        type: "necesidad",
      },
      {
        name: "Leer libro",
        priority: "bajo",
        type: "deseo",
      },
    ],
  },
  salud: {
    description: "Cuidado personal y salud",
    items: [
      {
        name: "Tomar vitaminas",
        priority: "alto",
        type: "necesidad",
      },
      {
        name: "Agendar cita médica",
        priority: "bajo",
        type: "necesidad",
      },
      {
        name: "Meditar 10 minutos",
        priority: "bajo",
        type: "deseo",
      },
    ],
  },
  hogar: {
    description: "Mantenimiento y mejoras del hogar",
    items: [
      {
        name: "Reparar grifo",
        priority: "alto",
        type: "necesidad",
      },
      {
        name: "Limpiar garage",
        priority: "bajo",
        type: "deseo",
      },
    ],
  },
};

// Inicializar Firebase y cargar datos
async function inicializarDatos() {
  try {
    console.log("🔥 Inicializando Firebase...");
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    console.log("📝 Cargando datos iniciales...");
    await set(ref(db, "/listas"), datosIniciales);

    console.log("✅ ¡Datos cargados exitosamente!");
    console.log("");
    console.log("📊 Listas creadas:");
    Object.keys(datosIniciales).forEach((lista) => {
      const itemCount = datosIniciales[lista].items.length;
      console.log(`  - ${lista}: ${itemCount} items`);
    });
    console.log("");
    console.log("🎉 ¡Firebase Realtime Database inicializado!");
    console.log("🚀 Ahora puedes usar tu app y crear nuevos items");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al inicializar Firebase:", error);
    process.exit(1);
  }
}

inicializarDatos();
