import React, { useState, useEffect } from "react";
import axios from "axios";
import SongList from "./SongList";
import SongForm from "./SongForm";
import SongFormModal from "./SongFormModal";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './Home'; // <--- Import your components
import About from './About'; // <--- Import your components
import Contact from './Contact'; // <--- Import your components




function App() {
  return (
      <Routes> {/* <--- Wrap all your Route components with Routes */}
          <Route path="/" element={<Home />} />              {/* <--- Define your routes */}
          <Route path="/about" element={<About />} />        {/* <--- Define your routes */}
          <Route path="/contact" element={<Contact />} />    {/* <--- Define your routes */}
      </Routes> {/* <--- Wrap all your Route components with Routes */}
  );
}



export interface Song {
  id: number;
  title: string;
  artist: string;
}

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [show, setShow] = useState<Boolean>(false);

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
    console.log("addSong ran", title, artist);
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
      {/* <SongForm onAddSong={addSong} /> */}
      <SongFormModal show={show} setShow={setShow} addSong={addSong} />
      <button onClick={() => setShow(!show)}>Add Song </button>
      <SongList
        songs={songs}
        onUpdateSong={updateSong}
        onDeleteSong={deleteSong}
      />
    </div>
  );
};

export default App;
