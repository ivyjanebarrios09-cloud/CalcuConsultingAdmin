import type { Application, Inquiry, ContactMessage, OldApplication, OldInquiry, OldMessage } from './types';

export const applications: Application[] = [
  { id: 'APP001', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '01234 567890', jobType: 'Chef de Partie', location: 'Central London', submittedAt: '2023-10-27' },
  { id: 'APP002', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '01234 567891', jobType: 'Frontend Developer', location: 'East London', submittedAt: '2023-10-26' },
  { id: 'APP003', firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com', phone: '01234 567892', jobType: 'UI/UX Designer', location: 'West London', submittedAt: '2023-10-25' },
];

export const inquiries: Inquiry[] = [
  { id: 'INQ001', companyName: 'Innovate Inc.', contactPerson: 'Alice Johnson', email: 'alice.j@innovate.com', phone: '01234 567893', jobTitles: ['Web Development', 'Cloud Consulting'], jobDescription: 'Looking for a skilled developer.', requiredSkills: 'React, Node.js', employmentType: 'permanent', submittedAt: '2023-10-28' },
  { id: 'INQ002', companyName: 'Solutions Co.', contactPerson: 'Bob Williams', email: 'bob.w@solutions.co', phone: '01234 567894', jobTitles: ['Mobile App Development'], jobDescription: 'iOS and Android developer needed.', requiredSkills: 'Swift, Kotlin', employmentType: 'contract', submittedAt: '2023-10-27' },
];

export const contactMessages: ContactMessage[] = [
  { id: 'MSG001', name: 'Frank Harris', email: 'frank.h@email.com', phone: '01234 567895', message: 'Question about services', submittedAt: '2023-10-28' },
  { id: 'MSG002', name: 'Grace Clark', email: 'grace.c@email.com', phone: '01234 567896', message: 'Partnership Proposal', submittedAt: '2023-10-27' },
];


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
