import type { Timestamp } from 'firebase/firestore';

export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobType: string;
  location: string;
  submittedAt: string;
};

export type Inquiry = {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  jobTitles: string[];
  jobDescription: string;
  requiredSkills: string;
  employmentType: 'permanent' | 'temporary' | 'contract';
  additionalInfo?: string;
  submittedAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
};
