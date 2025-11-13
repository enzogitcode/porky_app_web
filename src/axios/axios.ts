import axios from "axios";
import type { Paricion, Pigs } from "../types/types";

const datosURL= 'http://localhost:4000/pigs'

const instance = axios.create({
    baseURL:datosURL,
    headers: {
        "Content-Type":"application/json"
    }
})

//pigs
export const getPigs = async () => await instance.get('/')

export const postPig = async (data:Pigs) => await instance.post('/', data)

//id

export const getPigById = async (id:string) => await instance.get(`/${id}`)

export const patchPigById = async (data:Pigs, id:string) => await instance.patch(`/${id}`, data)

export const deletePigById = async (id:string) => await instance.delete(`/${id}`)

//nroCaravana
export const getPigByCaravana = async (nroCaravana:number) => await instance.get(`/caravana/${nroCaravana}`)

//export const updatePigByCaravana = async (nroCaravana:number) => await instance.get(`/caravana/${nroCaravana}`)

//export const deletePigByNroCaravana = async (nroCaravana:number) => await instance.delete(`/caravana/${nroCaravana}`)




//pariciones
export const patchParicion = async (paricionId:string, pigId:string, data:Paricion) => await axios.patch(`/${pigId}/${paricionId}`, data)


