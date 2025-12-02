import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllPigsQuery } from "../redux/features/pigSlice";
import Container from "./Container";
import InputCustom from "./InputCustom";
import ButtonCustom from "./ButtonCustom";
import type { Pig } from "../types/types";

const Searcher = () => {
  const { data, isLoading, isError } = useGetAllPigsQuery();

  // 🔑 ahora el select permite todas las propiedades relevantes
  const [searchField, setSearchField] = useState<
    "nroCaravana" | "descripcion" | "estadio" | "ubicacion" | "createdAt" | "updatedAt"
  >("nroCaravana");

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Pig[]>([]);

  const handleSearch = () => {
    if (!data) return;

    let results: Pig[] = [];

    switch (searchField) {
      case "nroCaravana": {
        const num = Number(searchValue);
        results = data.filter((pig) => pig.nroCaravana === num);
        break;
      }
      case "descripcion": {
        results = data.filter(
          (pig) =>
            pig.descripcion &&
            pig.descripcion.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      }
      case "estadio": {
        results = data.filter(
          (pig) =>
            pig.estadio &&
            pig.estadio.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      }
      case "ubicacion": {
        results = data.filter(
          (pig) =>
            pig.ubicacion &&
            pig.ubicacion.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      }
      case "createdAt": {
        results = data.filter((pig) =>
          pig.createdAt.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      }
      case "updatedAt": {
        results = data.filter((pig) =>
          pig.updatedAt.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      }
      default:
        results = [];
    }

    setFilteredData(results);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  return (
    <Container className="">
      <div className="flex gap-2 items-center">
        {/* Select para elegir el campo */}
        <select
          value={searchField}
          onChange={(e) =>
            setSearchField(
              e.target.value as
                | "nroCaravana"
                | "descripcion"
                | "estadio"
                | "ubicacion"
                | "createdAt"
                | "updatedAt"
            )
          }
        >
          <option value="nroCaravana">Nro Caravana</option>
          <option value="descripcion">Descripción</option>
          <option value="estadio">Estadio</option>
          <option value="ubicacion">Ubicación</option>
          <option value="createdAt">Fecha de creación</option>
          <option value="updatedAt">Última actualización</option>
        </select>

        {/* Input para escribir el valor */}
        <InputCustom
          type={searchField === 'createdAt'||'updatedAt' ? 'date': 'text'}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <ButtonCustom type="button" onClick={handleSearch} className="rounded-2xl bg-sky-300 p-2">
          Buscar
        </ButtonCustom>
      </div>

      {/* Resultados */}
      <ul>
        {filteredData.map((pig) => (
          <li key={pig._id}>
            <strong>Caravana:</strong> {pig.nroCaravana} |{" "}
            <strong>Estado:</strong> {pig.estadio} |{" "}
            <strong>Descripción:</strong> {pig.descripcion ?? "-"} |{" "}
            <strong>Ubicación:</strong> {pig.ubicacion ?? "-"} |{" "}
            <strong>Creado:</strong> {pig.createdAt} |{" "}
            <strong>Actualizado:</strong> {pig.updatedAt}
            {/* 🔗 Link a la ficha del cerdo */}
            <Link
              to={`/pigs/${pig._id}`}
              className="text-blue-600 underline ml-2"
            >
              Ver detalles
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Searcher;
