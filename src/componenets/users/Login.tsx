import { useState } from "react";
import InputCustom from "../../ui/InputCustom";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser, selectLoading, selectError } from "../../redux/features/authSlice";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ username: "", pin: "" });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(loginUser({ username: loginForm.username, pin: loginForm.pin }))
      .unwrap()
      .then((user) => {
        console.log("Login exitoso, user:", user);
        navigate("/"); // redirige al home
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoginForm({ username: "", pin: "" });
  };

  return (
    <Container className="containerBg flex flex-col gap-4 justify-center-safe h-screen text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-4xl">Ingresar</h1>

        {error && <p className="text-red-500">{error}</p>}

        <InputCustom
          inputClassName="text-center"
          className="text-center text-2xl bg-white"
          label="Nombre de usuario"
          type="text"
          value={loginForm.username}
          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
        />

        <InputCustom
          inputClassName="text-center"
          className="text-center text-2xl bg-white"
          label="Pin"
          type="password"
          value={loginForm.pin}
          onChange={(e) => setLoginForm({ ...loginForm, pin: e.target.value })}
        />

        <div className="mt-4 flex flex-wrap gap-4 items-center-safe justify-center-safe">
          <ButtonCustom className="updateButton" onClick={handleSubmit}>
            {loading ? "Ingresando..." : "Ingresar"}
          </ButtonCustom>

          <ButtonCustom className="dangerButton" onClick={handleReset}>
            Resetear
          </ButtonCustom>
        </div>
      </div>
    </Container>
  );
};

export default Login;
