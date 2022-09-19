import React, { useEffect, useState } from "react";
import { Card, Container, Table, ButtonGroup, Button } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function StudentList(props) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    let getStudents = () => {
        axios
            .get("http://localhost:8080/listpatient")
            .then((response) => setPatients(response.data))
            .catch((error) => alert(error));
    };

    let deleteStudent = (studentId) => {
      axios.delete("http://localhost:8080/deletepatient/"+studentId)
      .then(response=> {
        if (response.data !== null){
          alert("Record deleted successfully")
          setStudents(students.filter(student=>student.id!==studentId));
        }
      })
    }

    return (
        <div className="my-3">
            <Container>
                <Card.Header>
                    <h3>Student List</h3>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>Student Name</th>
                                <th>Address</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>{students.length} Students Available!!!</td>
                                </tr>
                            ) : (
                                patients.map((patient) =>
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.address}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/editpatient/" + patient.id}><Button size="sm" variant="outline-primary">
                                                    <FontAwesomeIcon icon={faEdit}> Edit </FontAwesomeIcon></Button></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={deletePatient.bind(this, patient.id)}><FontAwesomeIcon icon={faTrash}> Delete </FontAwesomeIcon></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Container>
        </div>
    );
}
