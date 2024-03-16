import React from "react";
import { useFormik } from "formik";
import { useApi } from "../../../hooks/useApi";
import { CiUser, CiPhone } from "react-icons/ci";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import FormInputField from "../../formInputField/FormInputField";
import validationSchema from "./validationSchema";

import { UserRegisterRequestDataType, UserRegisterResponseDataType } from "../../../types/User";
import ButtonForm from "../../ButtonForm";
import { registerUser } from "../../../api/auth";
import { useAuthModal } from "../../../context/AuthModalContext";
import { ModalStateEnum } from "../../../types/AuthModal";

const Register: React.FC = () => {
  const { error, isLoading, mutate } = useApi<UserRegisterRequestDataType, UserRegisterResponseDataType>(registerUser);
  const { openModal } = useAuthModal();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          if (data) openModal(ModalStateEnum.ACTIVATE_ACCOUNT);
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInputField label="Imię" name="firstName" IconComponent={CiUser} formik={formik} />
      <FormInputField label="Nazwisko" name="lastName" IconComponent={CiUser} formik={formik} />
      <FormInputField label="Numer telefonu" name="phoneNumber" IconComponent={CiPhone} formik={formik} />
      <FormInputField label="Email" name="email" IconComponent={MdOutlineEmail} formik={formik} />
      <FormInputField label="Powtórz email" name="confirmEmail" IconComponent={MdOutlineEmail} formik={formik} />
      <FormInputField label="Hasło" name="password" type="password" IconComponent={MdOutlineLock} formik={formik} />
      <FormInputField label="Powtórz hasło" name="confirmPassword" type="password" IconComponent={MdOutlineLock} formik={formik} />

      <div className="buttons">
        <ButtonForm isLoading={isLoading} label={"Zarejestruj się"} />
        {error && <div className="form-error">{error}</div>}
      </div>
    </form>
  );
};

export default Register;
