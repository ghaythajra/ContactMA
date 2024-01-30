import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listoContacts,
  addContact,
  modifyContact,
  deleteContact,
} from "./actions/contact.actions";
import { Container, Navbar, Table, Button, Form, Modal } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts || []);
  const error = useSelector((state) => state.contact.error);
  console.log("Error:", error);
console.log("Contacts:", contacts);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newContact, setNewContact] = useState({
    FirstName: "",
    LastName: "",
    CIN: "",
    PhoneNumber: "",
  });
  const [modifiedContact, setModifiedContact] = useState(null);

  useEffect(() => {
    dispatch(listoContacts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Modified Contact:", modifiedContact);
  }, [modifiedContact]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleAdd = () => setShow(true);

  const handleModify = (contactId) => {
    const contactToModify = contacts.find(
      (contact) => contact._id === contactId
    );
    setModifiedContact(contactToModify);
    setShowEdit(true);
  };

  const handleDelete = (contactId) => dispatch(deleteContact(contactId));

  const handleAddSubmit = () => {
    dispatch(addContact(newContact));
    handleClose();
  };

  const handleModifySubmit = () => {
    dispatch(modifyContact(modifiedContact._id, modifiedContact));
    handleCloseEdit();
  };

  return (
    <div className="App">
      <Navbar bg="primary" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Contacts List</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="p-4">
        <Button variant="danger" onClick={handleAdd}>
          Add
        </Button>{" "}
        <h2>Contacts List</h2>
      </div>

      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>CIN</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(contacts) && contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contact.FirstName}</td>
                  <td>{contact.LastName}</td>
                  <td>{contact.CIN}</td>
                  <td>{contact.PhoneNumber}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleModify(contact._id)}
                    >
                      Modify
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Data Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newContact.FirstName}
                onChange={(e) =>
                  setNewContact({ ...newContact, FirstName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newContact.LastName}
                onChange={(e) =>
                  setNewContact({ ...newContact, LastName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formCIN">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CIN"
                value={newContact.CIN}
                onChange={(e) =>
                  setNewContact({ ...newContact, CIN: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newContact.PhoneNumber}
                onChange={(e) =>
                  setNewContact({ ...newContact, PhoneNumber: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={modifiedContact ? modifiedContact.FirstName : ""}
                onChange={(e) =>
                  setModifiedContact({
                    ...modifiedContact,
                    FirstName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={modifiedContact ? modifiedContact.LastName : ""}
                onChange={(e) =>
                  setModifiedContact({
                    ...modifiedContact,
                    LastName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formCIN">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CIN"
                value={modifiedContact ? modifiedContact.CIN : ""}
                onChange={(e) =>
                  setModifiedContact({
                    ...modifiedContact,
                    CIN: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={modifiedContact ? modifiedContact.PhoneNumber : ""}
                onChange={(e) =>
                  setModifiedContact({
                    ...modifiedContact,
                    PhoneNumber: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModifySubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
