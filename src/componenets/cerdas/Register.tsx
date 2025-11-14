import React, { useState } from "react";
import InputCustom from "../../ui/InputCustom";
import ButtonCustom from "../../ui/ButtonCustom";
import { useCreateAPigMutation } from "../../redux/features/pigSlice";
import type { Situacion } from "../../types/types";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Registrar Cerdo</h2>

      <form onSubmit={handleSubmit}>
        <InputCustom
          label="Nro Caravana"
          type="number"
          value={form.nroCaravana}
          onChange={(e) => setForm({ ...form, nroCaravana: e.target.value })}
        />

        <div style={{ marginBottom: "1rem" }}>
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

        <InputCustom
          label="Descripción"
          type="text"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <InputCustom
          label="Ubicación"
          type="text"
          value={form.ubicacion}
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
        />

        <ButtonCustom type="submit">{isLoading ? "Creando..." : "Registrar Cerdo"}</ButtonCustom>
      </form>
    </div>
  );
};

export default Register;
