import React, { useState } from "react";
import FormContainer from "../../ui/FormContainer";
import InputCustom from "../../ui/InputCustom";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { useCreateVacunaMutation } from "../../redux/features/vacunaSlice";

const RegisterVacunaForm: React.FC = () => {
  const [VacunaForm, setVacunaForm] = useState({
    nombre: "",
    laboratorio: "",
    proveedor: "",
  dosis: "",
  descripcion: ""
  });
  const [createVacuna, {isLoading}] = useCreateVacunaMutation()
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      createVacuna(VacunaForm)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <Container>
      <FormContainer>
        <InputCustom
          value={VacunaForm.nombre}
          name="nombre"
          onChange={(e) =>
            setVacunaForm({ ...VacunaForm, nombre: e.target.value })
          }
          type="text"
        />
        <InputCustom
          value={VacunaForm.laboratorio ?? ""}
          name="laboratorio"
          type="text"
          onChange={(e) =>
            setVacunaForm({ ...VacunaForm, laboratorio: e.target.value })
          }
        />

        <ButtonCustom type="submit" onClick={handleSubmit}>
          Enviar
        </ButtonCustom>
      </FormContainer>
    </Container>
  );
};

export default RegisterVacunaForm;
