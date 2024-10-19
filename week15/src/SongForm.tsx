import React, { useState } from 'react';
import { Song } from './App';

interface SongFormProps {
  onAddSong: (song: Song) => void;
}

const SongForm: React.FC<SongFormProps> = ({ onAddSong }) => {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && artist) {
      onAddSong({ id: 0, title, artist }); // id will be assigned by the server
      setTitle('');
      setArtist('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Song Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default SongForm;

