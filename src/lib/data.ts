import type { Application, Inquiry, Message } from './types';

export const applications: Application[] = [
  { id: 'APP001', name: 'John Doe', email: 'john.doe@example.com', position: 'Frontend Developer', date: '2023-10-27', status: 'Reviewed' },
  { id: 'APP002', name: 'Jane Smith', email: 'jane.smith@example.com', position: 'Backend Developer', date: '2023-10-26', status: 'Pending' },
  { id: 'APP003', name: 'Peter Jones', email: 'peter.jones@example.com', position: 'UI/UX Designer', date: '2023-10-25', status: 'Rejected' },
  { id: 'APP004', name: 'Mary Johnson', email: 'mary.johnson@example.com', position: 'Project Manager', date: '2023-10-24', status: 'Reviewed' },
  { id: 'APP005', name: 'David Williams', email: 'david.williams@example.com', position: 'Frontend Developer', date: '2023-10-23', status: 'Pending' },
  { id: 'APP006', name: 'Sarah Brown', email: 'sarah.brown@example.com', position: 'Data Scientist', date: '2023-10-22', status: 'Pending' },
  { id: 'APP007', name: 'Michael Miller', email: 'michael.miller@example.com', position: 'Backend Developer', date: '2023-10-21', status: 'Reviewed' },
  { id: 'APP008', name: 'Emily Davis', email: 'emily.davis@example.com', position: 'UI/UX Designer', date: '2023-10-20', status: 'Rejected' },
];

export const inquiries: Inquiry[] = [
  { id: 'INQ001', name: 'Alice Johnson', company: 'Innovate Inc.', email: 'alice.j@innovate.com', service: 'Web Development', date: '2023-10-28' },
  { id: 'INQ002', name: 'Bob Williams', company: 'Solutions Co.', email: 'bob.w@solutions.co', service: 'Cloud Consulting', date: '2023-10-27' },
  { id: 'INQ003', name: 'Charlie Brown', company: 'Tech Forward', email: 'charlie.b@techforward.com', service: 'Mobile App Development', date: '2023-10-26' },
  { id: 'INQ004', name: 'Diana Miller', company: 'Global Solutions', email: 'diana.m@globalsolutions.com', service: 'SEO Optimization', date: '2023-10-25' },
  { id: 'INQ005', name: 'Ethan Wilson', company: 'NextGen Systems', email: 'ethan.w@nextgen.com', service: 'Web Development', date: '2023-10-24' },
];

export const messages: Message[] = [
  { id: 'MSG001', name: 'Frank Harris', email: 'frank.h@email.com', subject: 'Question about services', date: '2023-10-28' },
  { id: 'MSG002', name: 'Grace Clark', email: 'grace.c@email.com', subject: 'Partnership Proposal', date: '2023-10-27' },
  { id: 'MSG003', name: 'Henry Lewis', email: 'henry.l@email.com', subject: 'Feedback on website', date: '2023-10-26' },
  { id: 'MSG004', name: 'Ivy Walker', email: 'ivy.w@email.com', subject: 'Request for Quote', date: '2023-10-25' },
];
