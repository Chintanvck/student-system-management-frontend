import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateStudent(props) {
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
  
    const { studentId } = useParams(); // Get the Path Parameter from the URL
    const navigate = useNavigate();
  
    useEffect(() => {
      if (studentId) {
        axios
          .get("http://localhost:8080/patient/" + studentId)
          .then((response) => {
            if (response.data != null) {
            //   setId(response.data.id);
              setName(response.data.name);
              setAddress(response.data.address);
            }
          })
          .catch((error) => alert("danger", "Error"));
      }
    }, []);
  
    let patient = {
    //   id: id,
      name: name,
      address: address
    };
  
    let textChanged = (event) => {
      if (event.target.name === "id") {
        setId(event.target.value);
      } 
      else if (event.target.name === "name") {
        setName(event.target.value);
      } else if (event.target.name === "address") {
        setAddress(event.target.value);
      }
    };
  
    // let savePatient = (event) => {
    //   event.preventDefault();
      
    //     axios
    //       .post("http://localhost:8080/addpatient", patient)
    //       .then((response) => {
    //         if (response.data != null) {
    //           alert("Record added successfully");
    //           window.location.reload(false);
    //         }
    //       })
    //       .catch((error) => props.showAlert("danger", "Error"));
    // };
  
    let updatePatient = (event) => {
      event.preventDefault();
      axios.put("http://localhost:8080/updatepatient/" + patientId, patient).then((response) => {
        if (response.data != null) {
          alert("success", "Record updated successfully");
          navigate("/listpatient"); // Navigate to Students List Components
        }
      });
    };
  
    return (
      <div className="my-3">
        <Container>
          <Card>
            <Form onSubmit={updatePatient }>
              <Card.Header>
                <strong>{"Update Patient Information"}</strong>
              </Card.Header>
              <Card.Body>
                {/* <Form.Group className="mb-3" >
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    name="id"
                    value={id}
                    type="text"
                    placeholder="Enter id"
                    onChange={textChanged}
                  />
                </Form.Group> */}
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={name}
                    type="text"
                    placeholder="Enter name"
                    onChange={textChanged}
                  />
                  <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    name="age"
                    value={age}
                    type="text"
                    placeholder="Enter Age"
                    onChange={textChanged}
                  />
                </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={address}
                    type="text"
                    placeholder="Enter address"
                    onChange={textChanged}
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" type="submit">
                  {patientId != null ? "Update" : "Submit"}
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </Container>
      </div>
    );
}
