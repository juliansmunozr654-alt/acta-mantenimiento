import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDmwju7VRpDXnDoXTYolSWt32-2mSsRu0",
  authDomain: "actamantenimiento.firebaseapp.com",
  projectId: "actamantenimiento",
  storageBucket: "actamantenimiento.firebasestorage.app",
  messagingSenderId: "733954429070",
  appId: "1:733954429070:web:62046f7ae7cd8b733af9df",
  measurementId: "G-L0FMMCJS68"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.imprimirYGuardar = async function () {

    try {

        const trendMicro = [...document.querySelectorAll("tr")]
            .some(tr =>
                tr.innerText.includes("Trend Micro") &&
                tr.querySelector('input[type="checkbox"]:checked')
            );

        const datos = {

            fecha: document.getElementById("fecha")?.value || "",

            sucursal: document.getElementById("sede")?.value || "",

            piso: document.getElementById("piso")?.value || "",

            placa: document.getElementById("Placa")?.value || "",

            tipoActivo: document.getElementById("TipoActivo")?.value || "",

            modelo: document.getElementById("Modelo")?.value || "",

            memoriaRAM: document.getElementById("RAM")?.value || "",

            capacidadDisco: document.getElementById("DiscoDuro")?.value || "",

            teclado:
                document.getElementById("tecladoDespues")?.value || "",

            mouse:
                document.getElementById("tecladoDespues")?.value || "",

            antivirus:
                trendMicro ? "SI" : "NO",

            observaciones:
                document.getElementById("observaciones")?.value || "",

            fechaRegistro:
                new Date().toISOString()

        };

        await addDoc(
            collection(db, "mantenimientos"),
            datos
        );

        console.log("Registro guardado");

        window.print();

    }
    catch (error) {

        console.error(error);

        alert(
          "No fue posible guardar en Firebase"
        );

    }

};