
import Formuario from "./components/Formuario"
import Header from "./components/Header"
import LIstadoPaciente from "./components/LIstadoPacientes"
import {useState, useEffect} from 'react'
//import Paciente from "./components/Paciente"

function App() {


  const [pacientes, setPacientes] = useState(() => JSON.parse(localStorage.getItem('pacientes')) || []);
  const [paciente, setPaciente] = useState({})

  console.log('LocalStorage ' + localStorage.getItem('pacientes'))
/*
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      setPacientes(pacientesLS)
    }
    obtenerLS()
  },[])
*/
  useEffect(() => {
      localStorage.setItem('pacientes',JSON.stringify(pacientes))
  },[pacientes])

  const eliminarPaciente = (id) => {
    //console.log("Eliminando Paciente", id)
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    console.log(pacientesActualizados)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20"> 
      <Header
      />
      <div className="mt-12 md:flex">
        <Formuario
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />  
        <LIstadoPaciente
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
