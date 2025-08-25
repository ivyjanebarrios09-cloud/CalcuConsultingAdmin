export type Application = {
  id: string;
  name: string;
  email: string;
  position: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Rejected';
};

export type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  date: string;
};

export type Message = {
  id: string;
  name:string;
  email: string;
  subject: string;
  date: string;
};
