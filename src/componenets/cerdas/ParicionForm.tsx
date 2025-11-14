import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputCustom from "../../ui/InputCustom";
import ButtonCustom from "../../ui/ButtonCustom";
import { useAddParicionMutation } from "../../redux/features/pigSlice";

const ParicionForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [addParicion, { isLoading }] = useAddParicionMutation();

  const [form, setForm] = useState({
    fechaParicion: "",
    cantidadLechones: "",
    descripcion: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addParicion({
        pigId: id!,
        data: {
          fechaParicion: form.fechaParicion,
          cantidadLechones: Number(form.cantidadLechones),
          descripcion: form.descripcion,
        },
      }).unwrap();

      navigate(`/pigs/${id}`);
    } catch (err) {
      alert("Error al agregar parición");
    }
  };

  return (
    <div>
      <h2>Nueva Parición</h2>

      <form onSubmit={handleSubmit}>
        <InputCustom
          label="Fecha de parición"
          type="date"
          value={form.fechaParicion}
          onChange={(e) => setForm({ ...form, fechaParicion: e.target.value })}
        />

        <InputCustom
          label="Cantidad de lechones"
          type="number"
          value={form.cantidadLechones}
          onChange={(e) =>
            setForm({ ...form, cantidadLechones: e.target.value })
          }
        />

        <InputCustom
          label="Descripción"
          type="text"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <ButtonCustom type="submit">
          {isLoading ? "Guardando..." : "Agregar Parición"}
        </ButtonCustom>
      </form>
    </div>
  );
};

export default ParicionForm;
