import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

interface ModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  addSong: (title: String, artist: String) => void;
}
// props
const SongFormModal: React.FC<ModalProps> = ({ show, setShow, addSong }) => {
  const [songTitle, setSongTitle] = useState<String>("");
  const [artist, setArtist] = useState<String>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitSong = () => {
    console.log(songTitle, artist);
    addSong(songTitle, artist);
  };

  return (
    <div className="border border-2 border-black">
      {/*Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Favorite Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFavoriteSong">
              <Form.Label className="me-2">Song Title:</Form.Label>
              <input
                type="text"
                id="songTitle"
                onChange={(e) => setSongTitle(e.target.value)}
              ></input>
              <br />
              <Form.Label className="me-2">Artist:</Form.Label>
              <input
                type="text"
                id="artistName"
                onChange={(e) => setArtist(e.target.value)}
              ></input>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => submitSong()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SongFormModal;
