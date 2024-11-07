import { useState, useEffect } from "react";
import axios from "axios";
import SongList from "./sub-components/SongList";
//import SongForm from "./SongForm";
import SongFormModal from "./sub-components/SongFormModal";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import Home from "./sub-components/Home"; // <--- Import your components
import About from "./sub-components/About"; // <--- Import your components
import Contact from "./sub-components/Contact"; // <--- Import your components

export interface Song {
  id: number;
  title: string;
  artist: string;
}

function App() {
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
    <div>
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
      <Routes>
        {" "}
        {/* <--- Wrap all your Route components with Routes */}
        <Route path="/" element={<Home />} /> {/* <--- Define your routes */}
        <Route path="/about" element={<About />} />{" "}
        {/* <--- Define your routes */}
        <Route path="/contact" element={<Contact />} />{" "}
        {/* <--- Define your routes */}
      </Routes>{" "}
      {/* <--- Wrap all your Route components with Routes */}
    </div>
  );
}

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

export default App;
