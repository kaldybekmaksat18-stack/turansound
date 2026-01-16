export type UserRole = 'artist' | 'client' | 'admin';

export type Genre = 
  | 'pop' 
  | 'rock' 
  | 'jazz' 
  | 'classical' 
  | 'folk' 
  | 'electronic' 
  | 'hip-hop' 
  | 'traditional'
  | 'dombra'
  | 'kobyz'
  | 'wedding'
  | 'corporate'
  | 'host'
  | 'entertainment'
  | 'show'
  | 'comedy'
  | 'magic'
  | 'dance'
  | 'kids'
  | 'hosts';

export type Region = 
  | 'almaty' 
  | 'astana' 
  | 'shymkent' 
  | 'karaganda' 
  | 'aktobe'
  | 'tashkent'
  | 'bishkek'
  | 'istanbul'
  | 'moscow'
  | 'beijing';

export interface Artist {
  id: string;
  name: string;
  stageName: string;
  avatar: string;
  coverImage: string;
  genres: Genre[];
  region: Region;
  languages: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  rating: number;
  reviewCount: number;
  verified: boolean;
  bio: string;
  experience: number; // years
  portfolio: {
    videos: string[];
    audio: string[];
    images: string[];
  };
  availableDates: string[];
  specialties: string[];
  equipment: string[];
  bookingCount: number;
}

export interface Review {
  id: string;
  artistId: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
  eventType: string;
}

export interface Booking {
  id: string;
  artistId: string;
  clientId: string;
  date: string;
  eventType: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  region: Region;
  // Artist-specific fields (optional)
  stageName?: string;
  genres?: string[];
  experience?: string;
}