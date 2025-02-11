import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import FormConsulta from "./components/consultas/formconsultas/FormConsultas";
import FormPaciente from "./components/paciente/formpaciente/FormPaciente";
import PaginaDashboardBase from "./pages/paginadashboardbase/PaginaDashboardBase";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
import { ListaPaciente } from "./components/paciente/listapaciente/ListaPaciente";
import About from "./pages/about/About";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ListaConsultas } from "./components/consultas/listaconsultas/ListaConsultas";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<PaginaDashboardBase />}>
            <Route
              path=""
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="Cadastro-consulta"
              element={
                <>
                  <Navbar />
                  <FormConsulta />
                </>
              }
            />
            <Route
              path="cadastro-paciente"
              element={
                <>
                  <Navbar />
                  <FormPaciente />
                </>
              }
            />
            <Route
              path="consulta"
              element={
                <>
                  <Navbar />
                  <ListaConsultas />
                </>
              }
            />
            <Route
              path="pacientes"
              element={
                <>
                  <Navbar />
                  <ListaPaciente />
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
