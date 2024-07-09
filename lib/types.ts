export interface CarouselImage {
  id: number;
  image: string;
}

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
  exImageList: CarouselImage[];
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

export interface CreateExperienceRequestBody {
  title: string;
  location: string;
  datetime: string;
  content: string;
  duration: string;
  cost: number;
  contact: string;
  limitMember: number;
  language: string;
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

export const ACCEPTED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/JPG",
  "image/JPEG",
  "image/PNG",
];

export interface Participant {
  participationId: number;
  userProfile: {
    id: number;
    profileImg: null | string;
    name: string;
  };
}

export interface Bookmark {
  createdAt: string;
  experience: {
    id: number;
    title: string;
    location: string;
    language: string;
    datetime: string;
    limitMember: number;
    exImageList: CarouselImage[];
  };
}
