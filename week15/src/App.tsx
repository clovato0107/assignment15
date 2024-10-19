import React, { useState, useEffect } from "react";
import axios from "axios";
import SongList from "./SongList";
import SongForm from "./SongForm";

export interface Song {
  id: number;
  title: string;
  artist: string;
}

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const URL = "http://localhost:3000/songs";
  // Fetch the songs from the JSON server
  useEffect(() => {
    // Code in here runs when the page loads.
    getSongs();
  }, []);

  const getSongs = async () => {
    axios
      .get(URL)
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  };

  // Add a song
  const addSong = (title: String, artist: String) => {
    let newSong = {
      title: title,
      artist: artist,
    };
    axios
      .post(URL, newSong)
      .then((response) => setSongs([...songs, response.data]))
      .catch((error) => console.error("Error adding song:", error));
  };

  // Update a song
  //   const updateTask = (id: number, newText: string) => {
  // fetch(`http://localhost:5000/tasks/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ text: newText }),
  // })
  //   .then(response => response.json())
  //   .then(updatedTask => {
  //     setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  //   });

  const updateSong = (updatedSong: Song) => {
    axios
      .put(`${URL}/${updatedSong.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateSong }),
      })
      .then((response) => response.data)
      .then(() => {
        setSongs(
          songs.map((song) => (song.id === updatedSong.id ? updatedSong : song))
        );
      })
      .catch((error) => console.error("Error updating song:", error));
  };

  // Delete a song
  const deleteSong = (id: number) => {
    axios
      .delete(`${URL}/${id}`, {
        method: "DELETE",
      })
      .then(() => setSongs(songs.filter((song) => song.id !== id)))
      .catch((error) => console.error("Error deleting song:", error));
  };

  return (
    <div className="App container">
      <h1>My Playlist</h1>
      <SongForm onAddSong={addSong} />
      <SongList
        songs={songs}
        onUpdateSong={updateSong}
        onDeleteSong={deleteSong}
      />
    </div>
  );
};

export default App;
