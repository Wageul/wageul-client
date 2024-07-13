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

export interface UserWithCounts {
  user: User;
  createdExCnt: number;
  joinedPtCnt: number;
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
  experience: SimpleExperience;
}

export interface SimpleExperience {
  id: number;
  title: string;
  location: string;
  language: string;
  datetime: string;
  limitMember: number;
  exImageList: CarouselImage[];
}

export interface Review {
  id: number;
  writer: {
    id: number;
    profileImg: string | null;
    name: string;
  };
  targetId: number;
  content: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  avg: number;
  reviews: Review[]
}