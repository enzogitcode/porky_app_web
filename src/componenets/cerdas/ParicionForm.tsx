import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputCustom from "../../ui/InputCustom";
import ButtonCustom from "../../ui/ButtonCustom";
import { useAddParicionMutation } from "../../redux/features/pigSlice";
import type { Paricion, Servicio } from "../../types/types";

interface FormState {
  fechaParicion: string|undefined;
  cantidadLechones: string;
  descripcion: string;
  servicioTipo?: Servicio["tipo"];
  servicioFecha?: string|undefined;
  servicioMacho?: string;
}

const ParicionForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [addParicion, { isLoading }] = useAddParicionMutation();

  const [form, setForm] = useState<FormState>({
    fechaParicion: "",
    cantidadLechones: "",
    descripcion: "",
    servicioTipo: undefined,
    servicioFecha: "",
    servicioMacho: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fechaParicion) {
      alert("La fecha de parición es obligatoria");
      return;
    }

    // Convertimos siempre a Date antes de enviar
    const fechaParicionDate = new Date(form.fechaParicion);

    let servicioData: Servicio | undefined = undefined;

    if (form.servicioTipo) {
      servicioData = {
        tipo: form.servicioTipo,
        fecha: form.servicioFecha ? new Date(form.servicioFecha) : undefined,
        macho:
          form.servicioTipo === "cerdo"
            ? form.servicioMacho || undefined
            : undefined,
      };
    }

    const paricionData: Paricion = {
      fechaParicion: fechaParicionDate,
      cantidadLechones: Number(form.cantidadLechones),
      descripcion: form.descripcion,
      servicio: servicioData,
    };

    console.log("Datos a enviar:", paricionData);

    try {
      const updatedPig = await addParicion({
        pigId: id!,
        data: paricionData,
      }).unwrap();

      console.log("Respuesta del backend:", updatedPig);
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

        <label>Tipo de servicio</label>
        <select
          name="servicioTipo"
          value={form.servicioTipo || ""}
          onChange={handleChange}
        >
          <option value="">-- Seleccionar --</option>
          <option value="cerdo">Cerdo</option>
          <option value="inseminacion">Inseminación</option>
          <option value="desconocido">Desconocido</option>
        </select>

        {form.servicioTipo !== "desconocido" && (
          <>
            <InputCustom
              label="Fecha de servicio"
              type="date"
              name="servicioFecha"
              value={form.servicioFecha || ""}
              onChange={handleChange}
            />

            {form.servicioTipo === "cerdo" && (
              <InputCustom
                label="Macho"
                type="text"
                name="servicioMacho"
                value={form.servicioMacho || ""}
                onChange={handleChange}
              />
            )}
          </>
        )}

        <ButtonCustom type="submit">
          {isLoading ? "Guardando..." : "Agregar Parición"}
        </ButtonCustom>
      </form>
    </div>
  );
};

export default ParicionForm;
