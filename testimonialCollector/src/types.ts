export interface User {
    id: string;
    email: string;
    name: string;
    company: string;
    role: string;
    avatar?: string;
  }
  
  export interface Testimonial {
    id: string;
    author: {
      name: string;
      role: string;
      company: string;
      avatar: string;
    };
    content: string;
    rating: number;
    type: 'video' | 'text';
    videoUrl?: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface ApiError {
    message: string;
    status: number;
  }