"use client";
import LibraryTable from "../../components/MusicContainer/LibraryTable";

export default function LibraryPage() {
  return (
    <div id="library" className="library-menu">
      <h1>Your Library</h1>
      <div className="table">
        <div className="table_header">
          <div className="col_index">#</div>
          <div className="col_title">Title</div>
          <div className="col_artist">Artist</div>
          <div className="col_duration">Duration</div>
        </div>

        <LibraryTable />
      </div>
    </div>
  );
}
