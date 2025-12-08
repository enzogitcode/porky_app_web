import { useState } from "react";
import ButtonCustom from "../../ui/ButtonCustom";
import InputCustom from "../../ui/InputCustom";
import { useAddParicionMutation } from "../../redux/features/pigSlice";
import { useParams } from "react-router-dom";
import { paricionSchema } from "../../zodSchemas/paricionSchema";
import type { Paricion } from "../../types/types";

const ParicionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [paricion, setParicion] = useState({
    fechaParicion: "",
    cantidadLechones: "",
    descripcion: "",
    servicio: {
      tipo: "desconocido",
      fecha: "",
      macho: "",
      proveedorDosis: "", // ← agregado
    },
  });

  const [addParicion, { isLoading }] = useAddParicionMutation();

  const handleChange = (field: string, value: any) => {
    setParicion((prev) => ({ ...prev, [field]: value }));
  };

  const handleServicioChange = (field: string, value: any) => {
    setParicion((prev) => ({
      ...prev,
      servicio: { ...prev.servicio, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert("No se encontró el ID del cerdo");
      return;
    }

    // 🔍 Validación con Zod
    const validation = paricionSchema.safeParse(paricion);
    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }

    const parsed = validation.data;

    // 🛠 Formateo para Backend
    const formatted: Paricion = {
      fechaParicion: new Date(parsed.fechaParicion).toISOString(),
      cantidadLechones: Number(parsed.cantidadLechones),
      descripcion: parsed.descripcion || "",
      fechaActualizacion: new Date().toISOString(),
      servicio:
        parsed.servicio.tipo === "desconocido"
          ? { tipo: "desconocido" as const }
          : {
              tipo: parsed.servicio.tipo as "cerdo" | "inseminacion",
              fecha: new Date(parsed.servicio.fecha!).toISOString(),

              ...(parsed.servicio.tipo === "cerdo" && {
                macho: parsed.servicio.macho,
              }),

              ...(parsed.servicio.tipo === "inseminacion" && {
                proveedorDosis: parsed.servicio.proveedorDosis, // ← agregado
              }),
            },
    };

    try {
      await addParicion({ pigId: id, data: formatted }).unwrap();
      alert("Parición guardada correctamente");

      // Reset form
      setParicion({
        fechaParicion: "",
        cantidadLechones: "",
        descripcion: "",
        servicio: {
          tipo: "desconocido",
          fecha: "",
          macho: "",
          proveedorDosis: "", // ← agregado
        },
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-base">
      <InputCustom
        label="Fecha de Parición"
        type="date"
        value={paricion.fechaParicion}
        onChange={(e) => handleChange("fechaParicion", e.target.value)}
      />

      <InputCustom
        label="Cantidad de Lechones"
        type="number"
        value={paricion.cantidadLechones}
        onChange={(e) => handleChange("cantidadLechones", e.target.value)}
      />

      <InputCustom
        label="Descripción"
        type="text"
        value={paricion.descripcion}
        onChange={(e) => handleChange("descripcion", e.target.value)}
      />

      <h4>Servicio</h4>

      <select
        value={paricion.servicio.tipo}
        onChange={(e) => handleServicioChange("tipo", e.target.value)}
      >
        <option value="cerdo">Cerdo</option>
        <option value="inseminacion">Inseminación</option>
        <option value="desconocido">Desconocido</option>
      </select>

      {paricion.servicio.tipo !== "desconocido" && (
        <>
          <InputCustom
            label="Fecha del Servicio"
            type="date"
            value={paricion.servicio.fecha}
            onChange={(e) => handleServicioChange("fecha", e.target.value)}
          />

          {paricion.servicio.tipo === "cerdo" && (
            <InputCustom
              label="Macho"
              type="text"
              value={paricion.servicio.macho}
              onChange={(e) => handleServicioChange("macho", e.target.value)}
            />
          )}

          {paricion.servicio.tipo === "inseminacion" && (
            <InputCustom
              label="Proveedor de la dosis"
              type="text"
              value={paricion.servicio.proveedorDosis}
              onChange={(e) =>
                handleServicioChange("proveedorDosis", e.target.value)
              }
            />
          )}
        </>
      )}

      <ButtonCustom type="submit">
        {isLoading ? "Guardando..." : "Enviar"}
      </ButtonCustom>

      <ButtonCustom
        type="reset"
        onClick={() =>
          setParicion({
            fechaParicion: "",
            cantidadLechones: "",
            descripcion: "",
            servicio: {
              tipo: "desconocido",
              fecha: "",
              macho: "",
              proveedorDosis: "",
            },
          })
        }
      >
        Restablecer
      </ButtonCustom>
    </form>
  );
};

export default ParicionForm;
