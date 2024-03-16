import { useFormik } from "formik";
import { useApi } from "../../../hooks/useApi";
import validationSchema from "./validationSchema";
import FormInputField from "../../formInputField/FormInputField";
import ButtonForm from "../../ButtonForm";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { UserLoginRequestDataType, UserLoginResponseDataType } from "../../../types/User";
import { loginUser } from "../../../api/auth";
import { useAuthModal } from "../../../context/AuthModalContext";
import { ModalStateEnum } from "../../../types/AuthModal";

const Login: React.FC = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" replace />;

  const { openModal, closeModal } = useAuthModal();

  const { error, isLoading, mutate } = useApi<UserLoginRequestDataType, UserLoginResponseDataType>(loginUser);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (responseData) => {
          login(responseData!.data);
          closeModal();
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInputField label={"Email"} name="email" formik={formik} IconComponent={MdOutlineEmail} />
      <FormInputField label="Hasło" name="password" type="password" formik={formik} IconComponent={MdOutlineLock} />
      <div className="buttons">
        <p className="forgot-password" onClick={() => openModal(ModalStateEnum.FORGET_PASSWORD)}>
          Nie pamiętasz hasła?
        </p>
      </div>
      <ButtonForm isLoading={isLoading} label={"Zaloguj się"} />
      {error && <div className="form-error">{error}</div>}
    </form>
  );
};

export default Login;
