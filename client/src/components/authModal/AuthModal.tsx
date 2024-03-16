import React from "react";

import Login from "./login/Login";
import Register from "./register/Register";
import ForgetPasswordPage from "./forgetPassword/ForgetPassword";
import ActivateAccount from "./activateAccount/ActivateAccount";

import "./AuthModalStyle.css";
import { ModalStateEnum } from "../../types/AuthModal";
import ResetPasswordPage from "./resetPassword/ResetPasswordPage";
import { useAuthModal } from "../../context/AuthModalContext";

const AuthModal: React.FC = () => {
  const { modalState, openModal, closeModal } = useAuthModal();

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={() => closeModal()}>
          &times;
        </button>
        <div className="tabs">
          {modalState === ModalStateEnum.FORGET_PASSWORD ? (
            <>
              <button className="tab" onClick={() => openModal(ModalStateEnum.LOGIN)}>
                Logowanie
              </button>
              <div className="tab active">Resetowanie hasła</div>
            </>
          ) : (
            <>
              <button className={modalState === ModalStateEnum.LOGIN ? "tab active" : "tab"} onClick={() => openModal(ModalStateEnum.LOGIN)}>
                Logowanie
              </button>
              <button className={modalState === ModalStateEnum.REGISTER ? "tab active" : "tab"} onClick={() => openModal(ModalStateEnum.REGISTER)}>
                Rejestracja
              </button>
            </>
          )}
        </div>

        {modalState === ModalStateEnum.LOGIN && <Login />}
        {modalState === ModalStateEnum.REGISTER && <Register />}
        {modalState === ModalStateEnum.FORGET_PASSWORD && <ForgetPasswordPage />}
        {modalState === ModalStateEnum.ACTIVATE_ACCOUNT && <ActivateAccount />}
        {modalState === ModalStateEnum.RESET_PASSWORD && <ResetPasswordPage />}
      </div>
    </div>
  );
};

export default AuthModal;
