import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { resetUserPin } from "../../redux/features/authSlice";
interface ResetPinProps {
  username: string; // usuario a resetear
  newPin:string
}

const ResetPin = ({ username }: ResetPinProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const [newPin, setNewPin] = useState<string|null>(null); // opcional si quieres mostrar pin temporal

  const handleReset = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await dispatch(resetUserPin(username)).unwrap();
      setNewPin(result.tempPin || ""); // backend devuelve tempPin
      setMessage(result.tempPin);
    } catch (err: any) {
      setMessage(err || "Error al resetear PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="containerBg flex flex-col gap-4 justify-center-safe h-screen text-center">
      <h1 className="text-3xl font-bold">Resetear PIN</h1>
      <p className="text-lg">Usuario: <strong>{username}</strong></p>

      {newPin && (
        <p className="text-green-600 font-bold">
          PIN temporal: {newPin}
        </p>
      )}

      {message && <p>{message}</p>}

      <ButtonCustom className="updateButton" onClick={handleReset} disabled={loading}>
        {loading ? "Reseteando..." : "Resetear PIN"}
      </ButtonCustom>
    </Container>
  );
};

export default ResetPin;
