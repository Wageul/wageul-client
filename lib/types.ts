export interface Experience {
  id: number;
  title: string;
  location: string;
  datetime: string;
  content: string;
  duration: string;
  cost: number;
  contact: string;
  limitMember: number;
  language: string;
  writer: {
    id: number;
    email: string;
    profileImg: string | null;
    name: string;
    username: string;
    nationality: string | null;
    introduce: string | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  profileImg: string | null;
  name: string;
  username: string;
  nationality: string | null;
  introduce: string | null;
  createdAt: string;
  updatedAt: string;
}
