import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputCustom from "../../ui/InputCustom";
import ButtonCustom from "../../ui/ButtonCustom";
import { useAddParicionMutation } from "../../redux/features/pigSlice";
import type { Paricion } from "../../types/types";

const ParicionForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [addParicion, { isLoading }] = useAddParicionMutation();

  const [form, setForm] = useState({
    fechaParicion: "",
    cantidadLechones: "",
    descripcion: "",
  });

  // Manejo unificado de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparar datos según el tipo Paricion
    const paricionData: Paricion = {
      fechaParicion: form.fechaParicion,
      cantidadLechones: Number(form.cantidadLechones),
      descripcion: form.descripcion,
    };

    try {
      // Llamada al backend
      const updatedPig = await addParicion({
        pigId: id!,
        data: paricionData,
      }).unwrap();

      // Navegar usando el id devuelto por el backend
      navigate(`/pigs/${updatedPig._id}`);
    } catch (err) {
      alert("Error al agregar parición");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Nueva Parición</h2>

      <form onSubmit={handleSubmit}>
        <InputCustom
          label="Fecha de parición"
          type="date"
          name="fechaParicion"
          value={form.fechaParicion}
          onChange={handleChange}
        />

        <InputCustom
          label="Cantidad de lechones"
          type="number"
          name="cantidadLechones"
          value={form.cantidadLechones}
          onChange={handleChange}
        />

        <InputCustom
          label="Descripción"
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />

        <ButtonCustom type="submit">
          {isLoading ? "Guardando..." : "Agregar Parición"}
        </ButtonCustom>
      </form>
    </div>
  );
};

export default ParicionForm;
