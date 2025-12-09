"use client";

import "@/app/styles/feature-playlists.css";
import "@/app/styles/library.css";
import { useMusicData } from "@/app/context/MusicDataContext";
import { useUser } from "@/app/context/UserContext";
import type { SelectedItem } from "@/app/types/music";

import DetailView from "./DetailView";
import TrackSection from "./TrackSection";
import PlaylistSection from "./PlaylistSection";
import ArtistSection from "./ArtistSection";
import MyPlaylistGrid from "../MusicContainer/MyPlaylistGrid";

interface Props {
  selected?: SelectedItem | null;
  onSelect?: (item: SelectedItem) => void;
  onBack?: () => void;
}

const FeaturedPlaylists: React.FC<Props> = ({ selected, onSelect, onBack }) => {
  const { user } = useUser();

  if (selected)
    return <DetailView data={selected} onBack={onBack ?? (() => {})} />;

  return (
    <div className="explore-container">
      <h2 className="title">Made For {user ? user.username : "Guest"}</h2>
      <TrackSection />

      <h2 className="title">Daily Mix</h2>
      <PlaylistSection onSelect={(pl) => onSelect?.(pl)} />

      <h2 className="title">Top Artists</h2>
      {/* <ArtistSection artists={artists} onSelect={(ar) => onSelect?.(ar)} /> */}
    </div>
  );
};

export default FeaturedPlaylists;
