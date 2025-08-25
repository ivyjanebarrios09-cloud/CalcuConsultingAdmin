import type { Application, Inquiry, ContactMessage } from './types';
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
