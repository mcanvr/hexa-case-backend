import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { GeneratedLogo } from '../models/GeneratedLogo';

const logoCollection = collection(db, 'generated_logos');

export const getAllLogos = async (): Promise<GeneratedLogo[]> => {
  const snapshot = await getDocs(logoCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    prompt: doc.data().prompt ?? '',
    logo_style: doc.data().logo_style ?? '',
    image_url: doc.data().image_url ?? '',
    created_at: doc.data().created_at ?? Timestamp.now(),
  }));
};

export const getLatestLogo = async (): Promise<GeneratedLogo | null> => {
  const q = query(logoCollection, orderBy('created_at', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    prompt: doc.data().prompt ?? '',
    logo_style: doc.data().logo_style ?? '',
    image_url: doc.data().image_url ?? '',
    created_at: doc.data().created_at ?? Timestamp.now(),
  };
};

export interface CreateLogoData {
  prompt: string;
  logo_style: string;
  image_url: string;
}

export const createLogo = async (
  logoData: CreateLogoData,
): Promise<GeneratedLogo> => {
  const newLogoData = {
    ...logoData,
    created_at: Timestamp.now(),
  };
  const docRef = await addDoc(logoCollection, newLogoData);
  return {
    id: docRef.id,
    ...newLogoData,
  };
};
