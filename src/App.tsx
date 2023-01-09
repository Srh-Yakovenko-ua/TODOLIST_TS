import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import CustomizedSnackbars from "./common/ErrorSnackbar";
import { TodoList } from "./components/TodoList/TodoList";
import { Route, Routes } from "react-router-dom";
import { ErrorRoute404 } from "./components/ErrorRoute-404/ErrorRoute404";
import { Login } from "./components/Auth/Login";
import { appStatusSelectors } from "./store/app/app-selectors";
import { authMeTC } from "./store/appAuth/appAuth-reducer";
import { MenuAppBar } from "./components/AppBar/AppBar";
import { isAppAuthInitializedSelectors } from "./store/appAuth/appAuth-selectors";
import { Preloader } from "./common/preloader/Preloader";
import { WrapperAppPreloader } from "./common/preloader/preloader-style";

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(appStatusSelectors);
  const isAppAuthInitialized = useAppSelector(isAppAuthInitializedSelectors);

  useEffect(() => {
    dispatch(authMeTC());
  }, [dispatch]);

  if (!isAppAuthInitialized) {
    return (
      <WrapperAppPreloader>
        <Preloader />
      </WrapperAppPreloader>
    );
  }
  return (
    <div>
      <CustomizedSnackbars />
      <MenuAppBar />
      {status === "loading" && <Preloader />}
      <Routes>
        <Route path={"/"} element={<TodoList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"*"} element={<ErrorRoute404 />} />
      </Routes>
    </div>
  );
}

export default App;
