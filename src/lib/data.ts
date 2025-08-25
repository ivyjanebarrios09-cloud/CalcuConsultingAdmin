import type { Application, Inquiry, ContactMessage, OldApplication, OldInquiry, OldMessage } from './types';
import admin from './firebase-admin';
import { format } from 'date-fns';

const db = admin.firestore();

function formatTimestamp(timestamp: admin.firestore.Timestamp): string {
  if (!timestamp) return '';
  return format(timestamp.toDate(), 'yyyy-MM-dd');
}

export async function getApplications(): Promise<Application[]> {
  const snapshot = await db.collection('applications').orderBy('submittedAt', 'desc').get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      submittedAt: formatTimestamp(data.submittedAt),
    } as Application;
  });
}

export async function getInquiries(): Promise<Inquiry[]> {
    const snapshot = await db.collection('inquiries').orderBy('submittedAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
        id: doc.id,
        ...data,
        submittedAt: formatTimestamp(data.submittedAt),
        } as Inquiry;
    });
}

export async function getContactMessages(): Promise<ContactMessage[]> {
    const snapshot = await db.collection('contacts').orderBy('submittedAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
        id: doc.id,
        ...data,
        submittedAt: formatTimestamp(data.submittedAt),
        } as ContactMessage;
    });
}


// Old mock data, to be removed
export const oldApplications: OldApplication[] = [
  { id: 'APP001', name: 'John Doe', email: 'john.doe@example.com', position: 'Frontend Developer', date: '2023-10-27', status: 'Reviewed' },
];
export const oldInquiries: OldInquiry[] = [
  { id: 'INQ001', name: 'Alice Johnson', company: 'Innovate Inc.', email: 'alice.j@innovate.com', service: 'Web Development', date: '2023-10-28' },
];
export const oldMessages: OldMessage[] = [
  { id: 'MSG001', name: 'Frank Harris', email: 'frank.h@email.com', subject: 'Question about services', date: '2023-10-28' },
];
