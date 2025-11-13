export interface Track {
  id: string;
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

export type SelectedItem = Playlist | Artist;
