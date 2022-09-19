import logo from './logo.svg';
import './App.css';
import NavigationBar from './Components/NavigationBar'

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Container>
          <Routes>
            <Route
              path="addpatient"
              element={<AddPatient />} />
            <Route
              path="editpatient/:patientId"
              element={<UpdatePatient />}
            />
            <Route
              path="listpatient"
              element={<PatientList />}
            />
            <Route
              path="registerUser"
              element={<RegistrationForm />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
