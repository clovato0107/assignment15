
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SongFormModal({show, setShow}) {


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Favorite Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SongFormModal;