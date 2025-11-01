import axios from "axios";
import type { Hembras } from "../types/types";

const datosURL= 'src/data/list.json'

const instance = axios.create()

export const datosGet = async () => await instance.get(datosURL)

export const datosPost = async (data:Hembras) => await instance.post(datosURL, data)