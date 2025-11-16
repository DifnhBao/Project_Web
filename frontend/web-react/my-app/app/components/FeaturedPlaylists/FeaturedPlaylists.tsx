"use client";

import "@/app/styles/feature-playlists.css";
import "@/app/styles/library.css";
import { useMusicData } from "@/app/context/MusicDataContext";
import type { SelectedItem } from "@/app/types/music";

import DetailView from "./DetailView";
import TrackSection from "./TrackSection";
import PlaylistSection from "./PlaylistSection";
import ArtistSection from "./ArtistSection";

interface Props {
  selected?: SelectedItem | null;
  onSelect?: (item: SelectedItem) => void;
  onBack?: () => void;
}

const FeaturedPlaylists: React.FC<Props> = ({ selected, onSelect, onBack }) => {
  const { tracks, playlists, artists, loaded } = useMusicData();

  if (!loaded) return <div className="loading">Đang tải dữ liệu...</div>;

  // Nếu có selected thì hiển thị DetailView
  if (selected)
    return <DetailView data={selected} onBack={onBack ?? (() => {})} />;

  return (
    <div className="explore-container">
      <h2 className="title">Recommended for you</h2>
      <TrackSection />
      {/* <TrackSection tracks={tracks} /> */}

      <h2 className="title">Featured Playlists</h2>
      <PlaylistSection
        playlists={playlists}
        onSelect={(pl) => onSelect?.(pl)}
      />

      <h2 className="title">Top Artists</h2>
      <ArtistSection artists={artists} onSelect={(ar) => onSelect?.(ar)} />
    </div>
  );
};

export default FeaturedPlaylists;
