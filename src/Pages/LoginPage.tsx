import React, { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useAppDispatch } from "../Hooks/Redux";
import { useLoginMutation, useMeQuery } from "../Services/LoginService";
import { setCredentials } from "../Store/Slices/AuthSlice";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";

const LoginPage: React.FC = () => {
  const { data: response } = useMeQuery("");
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(
        setCredentials({
          token: response?.token,
          email: response?.email,
          isAdmin: response?.isAdmin,
        })
      );
    }
  }, [response]);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      window.localStorage.setItem("token", user.token);
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };
  const onClickRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="flex flex-col min-w-full min-h-screen justify-center items-center">
      <Helmet>
        <title>Авторизация</title>
        <meta name="description" content="Купить новые и бу ПВХ окна/двери" />
        <meta
          name="keywords"
          content="купить окно, купить дверь, купить пвх окно, купить металлическую дверь, buoknoyar, бу окно, новое окно пвх, "
        />
      </Helmet>
      <div className="flex-[1_0_auto] flex items-center">
        <div className="border-2 p-6 border-lime-400 self-center ">
          <h1 className="mb-10 text-center text-3xl font-bold">Авторизация</h1>
          <MyInput value={email} onChange={onChangeLogin} placeholder="Логин" />
          <MyInput
            value={password}
            onChange={onChangePassword}
            placeholder="Пароль"
          />
          <div className="flex justify-beetwen mt-4">
            <MyButton onClick={onLogin} children="Отправить" />
            <MyButton onClick={onClickRedirect} children="На главную" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
