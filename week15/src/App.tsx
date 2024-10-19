import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from './SongList';
import SongForm from './SongForm';

export interface Song {
  id: number;
  title: string;
  artist: string;
}

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  // Fetch the songs from the JSON server
  useEffect(() => {
    axios.get('http://localhost:5000/songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error("Error fetching songs:", error));
  }, []);

  // Add a song
  const addSong = (newSong: Song) => {
    axios.post('http://localhost:5000/songs', newSong)
      .then(response => setSongs([...songs, response.data]))
      .catch(error => console.error("Error adding song:", error));
  };

  // Update a song
  const updateSong = (updatedSong: Song) => {
    axios.put(`http://localhost:5000/songs/${updatedSong.id}`, updatedSong)
      .then(() => {
        setSongs(songs.map(song => song.id === updatedSong.id ? updatedSong : song));
      })
      .catch(error => console.error("Error updating song:", error));
  };

  // Delete a song
  const deleteSong = (id: number) => {
    axios.delete(`http://localhost:5000/songs/${id}`)
      .then(() => setSongs(songs.filter(song => song.id !== id)))
      .catch(error => console.error("Error deleting song:", error));
  };

  return (
    <div className="App">
      <h1>My Playlist</h1>
      <SongForm onAddSong={addSong} />
      <SongList songs={songs} onUpdateSong={updateSong} onDeleteSong={deleteSong} />
    </div>
  );
};

export default App;


