"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogo = exports.getLatestLogo = exports.getAllLogos = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../config/firebase");
const logoCollection = (0, firestore_1.collection)(firebase_1.db, 'generated_logos');
const getAllLogos = async () => {
    const snapshot = await (0, firestore_1.getDocs)(logoCollection);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        prompt: doc.data().prompt ?? '',
        logo_style: doc.data().logo_style ?? '',
        image_url: doc.data().image_url ?? '',
        created_at: doc.data().created_at ?? firestore_1.Timestamp.now(),
    }));
};
exports.getAllLogos = getAllLogos;
const getLatestLogo = async () => {
    const q = (0, firestore_1.query)(logoCollection, (0, firestore_1.orderBy)('created_at', 'desc'), (0, firestore_1.limit)(1));
    const snapshot = await (0, firestore_1.getDocs)(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    return {
        id: doc.id,
        prompt: doc.data().prompt ?? '',
        logo_style: doc.data().logo_style ?? '',
        image_url: doc.data().image_url ?? '',
        created_at: doc.data().created_at ?? firestore_1.Timestamp.now(),
    };
};
exports.getLatestLogo = getLatestLogo;
const createLogo = async (logoData) => {
    const newLogoData = {
        ...logoData,
        created_at: firestore_1.Timestamp.now(),
    };
    const docRef = await (0, firestore_1.addDoc)(logoCollection, newLogoData);
    return {
        id: docRef.id,
        ...newLogoData,
    };
};
exports.createLogo = createLogo;
