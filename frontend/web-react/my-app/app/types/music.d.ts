export interface Track {
  trackId: number;
  title: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  artistName: string;
  albumName?: string;
}

export interface Playlist {
  playlistId: number;
  name: string;
  coverImages: string[];
  tracks: Track[];
}

export interface Artist {
  id: number;
  name: string;
  image: string;
}

export interface DetailViewData {
  type: "playlist" | "artist";
  title: string;
  coverImages: string[];
  tracks: Track[];
}

// User
export interface User {
  userId: string;
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
