import React from "react";
import { AuthForm } from "./AuthForm";
import { useAppSelector } from "../../store";
import { Navigate } from "react-router-dom";
import { appAuthSelectors } from "../../store/appAuth/appAuth-selectors";

export const Login = () => {
  const isAuth = useAppSelector(appAuthSelectors);
  if (isAuth) return <Navigate to={"/"} />;

  return <AuthForm />;
};
