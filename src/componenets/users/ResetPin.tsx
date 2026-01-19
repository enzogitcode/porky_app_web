import { useState } from "react";
import Container from "../../ui/Container";
import InputCustom from "../../ui/InputCustom";

const ResetPin = () => {
  const user = true;
  const [newPin, setNewPin] = useState("");

  return (
    <Container className="containerBg flex flex-col gap-4 justify-center-safe h-screen text-center">
      <h1 className="text-3xl font-bold">Resetear Pin</h1>
      <InputCustom
        inputClassName="text-center"
        className="text-center text-2xl bg-white"
        label="Nuevo Pin"
        type="text"
        value={newPin}
        onChange={(e) => setNewPin(e.target.value)}
      />
    </Container>
  );
};

export default ResetPin;
