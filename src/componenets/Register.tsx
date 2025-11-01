import React, { useState, useEffect } from 'react';
import type { Hembras } from '../types/types';
import ButtonCustom from '../ui/ButtonCustom';
import InputCustom from '../ui/InputCustom';
import PorkCard from '../ui/PorkCard';

const Register = () => {

  const [datos, setDatos] = useState<Hembras[]>([])

  const [nro, setNro] = useState<number | ''>(0);
  const [pariciones, setPariciones] = useState<number | ''>(0);
  const [descripcion, setDescripcion] = useState('');

  const datosURL= 'src/data/list.json'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await fetch(datosURL)
        setDatos(await Response.json())
        
       } catch (error) {
        
        console.log(error)
        throw new Error
      }
    }
    fetchData()
  
  }, [])
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar inputs mínimos
    if (nro === '' || pariciones === '' || descripcion.trim() === '') return;

    // Agregar nuevo elemento al estado
    setDatos(prev => [
      ...prev,
      { nro: Number(nro), pariciones: Number(pariciones), descripcion },
    ]);

    // Limpiar inputs
    setNro('');
    setPariciones('');
    setDescripcion('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nro">Escribir el nro</label>
        <input id='nro'
        placeholder='Escribe el nro'
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNro(Number(e.target.value))}
        />

        <InputCustom 
        label='pariciones'
        type='number'
        value={pariciones}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPariciones(Number(e.target.value))}
        />
        <InputCustom 
        label='descripción'
        
        type='text'
        value={descripcion}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescripcion(String(e.target.value))}
        />

       


        <ButtonCustom type="submit">
          Enviar
        </ButtonCustom>
      </form>
      
      <div>
        {datos.map( (item) => (<PorkCard {...item}/>) )}
      </div>

    </div>
  );
};

export default Register;
