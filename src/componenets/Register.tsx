import React, { useState, useEffect } from 'react';
import PorkList from './PorkList';
import ButtonCustom from '../ui/ButtonCustom';
import InputCustom from '../ui/InputCustom';
import type { Hembras } from '../types/types';
import { datosPost, datosGet } from '../axios/axios';

const Register = () => {
  
  const [nro, setNro] = useState<number | ''>(0);
  const [pariciones, setPariciones] = useState<number | ''>(0);
  const [descripcion, setDescripcion] = useState('');

  const [stock, setStock] = useState<Hembras[]>([])
  const [nvoStock, setNvoStock] = useState<Hembras[]>([])
  
        useEffect(() => {
          const fetchData = async () => {
            try {
              const {data} = await datosGet()
              setStock(data)
  
              
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
    const nuevaHembra = {nro, pariciones, descripcion}
    datosPost(nuevaHembra)
    setNvoStock([...stock, nuevaHembra])
    console.log(stock)
    

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
      
<PorkList data={nvoStock} />
      

    </div>
  );
};

export default Register;
