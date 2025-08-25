export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobType: string;
  location: string;
  submittedAt: string; // Using string for mock data, should be Firestore Timestamp
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
  submittedAt: string; // Using string for mock data, should be Firestore Timestamp
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string; // Using string for mock data, should be Firestore Timestamp
};

// The old types are kept for now to avoid breaking existing pages
// and will be removed in a subsequent step.
export type OldApplication = {
  id: string;
  name: string;
  email: string;
  position: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Rejected';
};

export type OldInquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  date: string;
};

export type OldMessage = {
  id: string;
  name:string;
  email: string;
  subject: string;
  date: string;
};
