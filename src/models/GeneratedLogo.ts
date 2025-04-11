import { Timestamp } from 'firebase/firestore';

export interface GeneratedLogo {
  id?: string;
  prompt: string;
  logo_style: string;
  image_url: string;
  created_at: Timestamp;
}
