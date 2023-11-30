import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import logo from './assets/logo.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Tel: '',
  });

  const [is_registered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (formData.Name === '' || formData.Email === '' || formData.Tel === '') {
      toast.error('Por favor, llene todos los campos');
      return;
    }

    if (formData.Tel.length !== 10) {
      toast.error('Por favor, ingrese un número de teléfono válido (sin lada)');
      return;
    }

    if (formData.Name.length < 3) {
      toast.error('Por favor, ingrese un nombre válido');
      return;
    }

    //validate email whit regex

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(formData.Email)) {
      toast.error('Por favor, ingrese un correo electrónico válido');
      return;
    }



    try {

      if (is_registered) {
        return;
      }
      const response = axios.post('https://qratendance.onrender.com/sheets', {
        Name: formData.Name,
        Email: formData.Email,
        Tel: formData.Tel,
      });
  
      // Parse the JSON response
      console.log(response.data);
      toast.success('¡Registro exitoso!');

      setIsRegistered(true);

      // Optionally, you can handle success or navigate to another page
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error.message);
    }
  };


  if (is_registered) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80%',
        marginBottom: '50px',
        paddingBottom: '50px',
        boxSizing: 'border-box'
      }}>

        <div className='logo-container'>
          <img src={logo} className='logo' />
        </div>

        <h1 className='title'>Registro</h1>

        <h2 className='subtitle'>¡Bienvenido! </h2>

        <h2 className='subtitle'>Ya has sido registrado</h2>

      </div>
    )
  }

  return (
    <>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80%',
        marginBottom: '50px',
        paddingBottom: '50px',
        boxSizing: 'border-box'
      }}>

       <ToastContainer />

        <div className='logo-container'>
          <img src={logo} className='logo' />
        </div>

        <h1 className='title'>Registro</h1>

        <h2 className='subtitle'>¡Bienvenido! Registra tu asistencia</h2>



        <form onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >



          <TextField
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            label="Nombre"
            variant="outlined"
            color="primary"
            fullWidth
            id='name'
            name='Name'
            onChange={handleChange}
            value={formData.Name}

          />

          <div style={{ height: '20px' }}></div>

          <TextField
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            id='email'
            variant="outlined"
            color="primary"
            fullWidth
            label="Email"
            type='email'
            name='Email'
            onChange={handleChange}
            value={formData.Email}
          />

          <div style={{ height: '20px' }}></div>

          <TextField
            sx={{ input: { color: 'white' }, label: { color: 'white' }, focused: { color: 'white' } }}
            id="tel"
            name='Tel'
            label="Teléfono"
            variant="outlined"
            color="primary"
            fullWidth

            onChange={handleChange}
            value={formData.Tel}

          />


          <div style={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            display: 'flex',

          }}>

            <Button
              type='submit'
              color='primary'
              variant="contained"
              disableElevation
              size='large'
              fullWidth

              style={{
                borderRadius: 10,
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                fontSize: "18px",
                border: "none",
                focusColor: 'none',
              }}
            >
              Enviar

            </Button>





          </div>

        </form>




      </div>








    </>
  )
}

export default App
