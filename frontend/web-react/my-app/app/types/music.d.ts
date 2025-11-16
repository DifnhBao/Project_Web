export interface Track {
  id: number;
  jamendo_id: number;
  title: string;
  artist: string;
  image: string;
  audio: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  user: string;
  coverImage: string;
  trackCount: number;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  tracks: Track[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  activity_status: string;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
}

export type SelectedItem = Playlist | Artist;
