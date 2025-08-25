import type { Application, Inquiry, ContactMessage } from './types';
import admin from './firebase-admin';
import { format } from 'date-fns';

const db = admin.firestore();

function formatTimestamp(timestamp: admin.firestore.Timestamp | undefined): string {
  if (!timestamp) return '';
  return format(timestamp.toDate(), 'yyyy-MM-dd');
}

export async function getApplications(): Promise<Application[]> {
  try {
    const snapshot = await db.collection('applications').orderBy('submittedAt', 'desc').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        jobType: data.jobType || '',
        location: data.location || '',
        submittedAt: formatTimestamp(data.submittedAt),
      } as Application;
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const snapshot = await db.collection('inquiries').orderBy('submittedAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          companyName: data.companyName || '',
          contactPerson: data.contactPerson || '',
          email: data.email || '',
          phone: data.phone || '',
          jobTitles: data.jobTitles || [],
          jobDescription: data.jobDescription || '',
          requiredSkills: data.requiredSkills || '',
          employmentType: data.employmentType || 'temporary',
          additionalInfo: data.additionalInfo || '',
          submittedAt: formatTimestamp(data.submittedAt),
        } as Inquiry;
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const snapshot = await db.collection('contacts').orderBy('submittedAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          message: data.message || '',
          submittedAt: formatTimestamp(data.submittedAt),
        } as ContactMessage;
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
}
