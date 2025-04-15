import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import fs from 'fs';
import { db } from '../config/firebase';
import genAi from '../config/gemini';
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
}

export const createLogo = async (
  logoData: CreateLogoData,
): Promise<GeneratedLogo> => {
  const uuid = crypto.randomUUID();

  let styleInstruction = 'No specific style requested, focus on the concept.';
  if (logoData.logo_style && logoData.logo_style.toLowerCase() !== 'no-style') {
    styleInstruction = `${logoData.logo_style} logo style.`;
  }

  const geminiPrompt = `
Task: Generate a high-quality logo.

Concept: ${logoData.prompt}

Style: ${styleInstruction}

Additional Instructions:
- The logo must have a clean, simple background (preferably white or transparent).
- Do not include any text or letters unless the concept explicitly asks for it.
- Create a visually appealing and recognizable symbol based on the concept and style.
- Ensure the final output is suitable for use as a company or brand logo.
`.trim();

  console.log('Generated Gemini Prompt:\n---\n', geminiPrompt, '\n---');

  const initialLogoData = {
    prompt: logoData.prompt,
    logo_style: logoData.logo_style,
    image_url: '',
    created_at: Timestamp.now(),
  };

  const docRef = await addDoc(logoCollection, initialLogoData);
  const logoId = docRef.id;

  let generatedImageUrl = '';

  try {
    const response = await genAi.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: geminiPrompt,
      config: {
        responseModalities: ['Text', 'Image'],
      },
    });

    for (const part of response?.candidates?.[0].content?.parts ?? []) {
      if (
        part.inlineData &&
        part.inlineData.mimeType &&
        part.inlineData.mimeType.startsWith('image/')
      ) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData ?? '', 'base64');
        const imagePath = `public/${uuid}.png`;
        fs.writeFileSync(imagePath, buffer);
        console.log(`Image saved to ${imagePath}`);

        generatedImageUrl = `${process.env.BASE_URL}/${uuid}.png`;

        await updateDoc(doc(logoCollection, logoId), {
          image_url: generatedImageUrl,
        });
        console.log(`Firestore document ${logoId} updated with image URL.`);
        break;
      }
    }

    if (!generatedImageUrl) {
      console.error('Gemini response did not contain image data.', response);
    }
  } catch (error) {
    console.error(
      `Error generating image or updating Firestore for doc ${logoId}:`,
      error,
    );
  }

  return {
    id: logoId,
    prompt: logoData.prompt,
    logo_style: logoData.logo_style,
    image_url: generatedImageUrl,
    created_at: initialLogoData.created_at,
  };
};
