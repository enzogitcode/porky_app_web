import React, { useState } from "react";
import InputCustom from "../../ui/InputCustom";
import ButtonCustom from "../../ui/ButtonCustom";
import { useCreateAPigMutation } from "../../redux/features/pigSlice";
import type { Situacion } from "../../types/types";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nroCaravana: "",
    estadio: "ninguno" as Situacion,
    descripcion: "",
    ubicacion: "",
  });

  const [createPig, { isLoading }] = useCreateAPigMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newPig = await createPig({
        nroCaravana: Number(form.nroCaravana),
        estadio: form.estadio,
        descripcion: form.descripcion,
        ubicacion: form.ubicacion,
      }).unwrap();

      navigate(`/pigs/${newPig._id}`);
    } catch (err) {
      alert("Error al crear cerdo");
    }
  };

  return (
    <Container className="text-center">
      <h2>Registrar Cerdo</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-2 border-b-cyan-700 justify-center-safe items-center-safe ">
        <InputCustom
        className="max-w-5xl self-center-safe"
        inputClassName="text-center"
          label="Nro Caravana"
          type="number"
          value={form.nroCaravana}
          onChange={(e) => setForm({ ...form, nroCaravana: e.target.value })}
        />

        <div>
          <label htmlFor="estadio">Estadio</label>
          <select
            id="estadio"
            value={form.estadio}
            onChange={(e) =>
              setForm({ ...form, estadio: e.target.value as Situacion })
            }
          >
            <option value="pregnant">Pregnant</option>
            <option value="parida con lechones">Parida con lechones</option>
            <option value="servida">Servida</option>
            <option value="enferma">Enferma</option>
            <option value="ninguno">Ninguno</option>
          </select>
        </div>

        {/* <InputCustom
        className=""
          label="Descripción"
          type="text"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        /> */}
        <label htmlFor="descripcion">Descripción</label>
        <textarea
        id="descripcion"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        >

        </textarea>

        <InputCustom
        inputClassName="text-center"
        className="text-center"
          label="Ubicación"
          type="text"
          value={form.ubicacion}
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
        />

        <ButtonCustom className="rounded bg-cyan-300 m-2 p-2"
         type="submit">{isLoading ? "Creando..." : "Registrar Cerdo"}</ButtonCustom>
      </form>
    </Container>
  );
};

export default Register;
