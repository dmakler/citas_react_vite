import {useState, useEffect} from "react"
import Error from "./Error";

const Formuario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(()=>{
        if(Object.keys(paciente).length>0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            }        
    },[paciente])


    const generarId = () =>{
        const random =  Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return fecha + random 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Validando Formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log("hay campos vacios")    
            setError(true)
            return
        }

        setError(false)

        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas        }

        if(paciente.id){
            //Editando paciente
            objetoPaciente.id = paciente.id

            const pacienteActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)            

            setPacientes(pacienteActualizado)

        }else{
            //Nuevo paciente
            objetoPaciente.id = generarId()
            setPacientes([...pacientes,objetoPaciente])
            setPaciente({})
        }


        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

        //console.log("Enviando formulario")
    }


  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade Paciente y {' '}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>
      <form 
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

        {/* Esto quiere decir que si hay error, mostrar la leyenda */}
        {(error) && (
                        <Error><p>Todos los campos son obligatorios</p></Error>  
                    )} 
        
        <div className='mb-5'>
            <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>
                Nombre Mascota
            </label>
            <input 
                id="mascota"
                type='text'
                placeholder='Nombre de la Mascota'
                className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md'
                value = {nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>
                Nombre propietario
            </label>
            <input 
                id="propietario"
                type='text'
                placeholder='Nombre del propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md'
                value = {propietario}
                onChange={(e) => setPropietario(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor="eMail" className='block text-gray-700 uppercase font-bold'>
                eMail
            </label>
            <input 
                id="eMail"
                type='email'
                placeholder='eMail contacto propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md'
                value = {email}
                onChange={(e) => setEmail(e.target.value)}

            />
        </div>
        <div className='mb-5'>
            <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
                Alta
            </label>
            <input 
                id="alta"
                type='date'
                placeholder='fecha de alta'
                className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md'
                value = {fecha}
                onChange={(e) => setFecha(e.target.value)}

            />
        </div>
        <div className='mb-5'>
            <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>
                Síntomas
            </label>
            <textarea 
                id="sintomas"
                placeholder='indique sintomatología'
                className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md'
                value = {sintomas}
                onChange={(e) => setSintomas(e.target.value)}

            />
        </div>

        <input
            type="submit"
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
            value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  )
}

export default Formuario
