import React, { useState } from 'react';
import { Song } from './App';
// props
interface SongListProps {
  songs: Song[];
  onUpdateSong: (song: Song) => void;
  onDeleteSong: (id: number) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onUpdateSong, onDeleteSong }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editableSong, setEditableSong] = useState<Song | null>(null);

  const handleEdit = (song: Song) => {
    setIsEditing(song.id);
    setEditableSong(song);
  };

  const handleSave = () => {
    if (editableSong) {
      onUpdateSong(editableSong);
      setIsEditing(null);
      setEditableSong(null);
    }
  };

  return (
    <div>
      {songs.length === 0 ? (
        <p>No songs in your playlist</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              {isEditing === song.id ? (
                <div>
                  <input
                    type="text"
                    value={editableSong?.title || ''}
                    onChange={(e) =>
                      setEditableSong({ ...editableSong!, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editableSong?.artist || ''}
                    onChange={(e) =>
                      setEditableSong({ ...editableSong!, artist: e.target.value })
                    }
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>
                    {song.title} by {song.artist}
                  </span>
                  <button onClick={() => handleEdit(song)}>Edit</button>
                  <button onClick={() => onDeleteSong(song.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;


