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
    <Container className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mt-4 mb-6">Registrar Cerdo</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg flex flex-col gap-6"
      >
        {/* Nro Caravana */}
        <InputCustom
          label="Nro Caravana"
          type="number"
          value={form.nroCaravana}
          inputClassName="text-center"
          onChange={(e) =>
            setForm({ ...form, nroCaravana: e.target.value })
          }
        />

        {/* Estadio */}
        <div className="flex flex-col gap-1">
          <label htmlFor="estadio" className="font-semibold">
            Estadio
          </label>

          <select
            id="estadio"
            value={form.estadio}
            onChange={(e) =>
              setForm({
                ...form,
                estadio: e.target.value as Situacion,
              })
            }
            className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="parida con lechones">Parida con lechones</option>
            <option value="pregnant">Pregnant</option>
            <option value="enferma">Enferma</option>
            <option value="servida">Servida</option>
            <option value="ninguno">Ninguno</option>
          </select>
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-1">
          <label htmlFor="descripcion" className="font-semibold">
            Descripción
          </label>

          <textarea
            id="descripcion"
            value={form.descripcion}
            onChange={(e) =>
              setForm({ ...form, descripcion: e.target.value })
            }
            className="border rounded-lg p-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ubicación */}
        <InputCustom
          label="Ubicación"
          type="text"
          value={form.ubicacion}
          inputClassName="text-center"
          onChange={(e) =>
            setForm({ ...form, ubicacion: e.target.value })
          }
        />

        <ButtonCustom
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isLoading ? "Creando..." : "Registrar Cerdo"}
        </ButtonCustom>
      </form>
    </Container>
  );
};

export default Register;
