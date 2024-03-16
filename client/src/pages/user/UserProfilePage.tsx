import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import validationSchema from "./validationSchema";
import FormInputField from "../../components/formInputField/FormInputField";

import "./UserProfilePageStyle.css";
import ButtonForm from "../../components/ButtonForm";
import { getUser, putUserData } from "../../api/user";
import { useApi } from "../../hooks/useApi";
import { User, UserDataResponseDataType, UserUpdateRequestDataType } from "../../types/User";
import { useEffect } from "react";
import { formatDateToReadableString } from "../../utils/dataConventer";

const UserProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const { isLoading: isUserDataLoading, mutate: userDataMutate, data: userData } = useApi<undefined, UserDataResponseDataType>(getUser);
  const { error, isLoading: isUpdateUserDataLodaing, mutate: mutateUpdateUserData } = useApi<UserUpdateRequestDataType, UserDataResponseDataType>(putUserData);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!userData || !userData.user) return;
      mutateUpdateUserData(
        {
          userId: user.id,
          password: values.password,
          newUserData: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
          },
        },
        {
          onSuccess: (data) => {
            if (!data || !data.user) return;
            const userData = data.user;
            updateUser(userData);
            formik.setValues({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
              password: "",
            });
          },
        }
      );
    },
  });

  useEffect(() => {
    userDataMutate(undefined, {
      onSuccess: (data) => {
        if (!data) return;
        const user: User = data.user;
        if (!user) return;
        formik.setValues({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: "",
        });
      },
    });
  }, []);

  if (!userData || !userData.user || isUserDataLoading) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-title">Witaj, {user.firstName}!</h1>
      <div className="user-profile-info">
        <p>Twoje konto zostalo załozone {formatDateToReadableString(user.createdAt.toString())}</p>
        <p>Liczba Twoich wizyt: 10 (test)</p>
        <p>Dziekujemy za zaufanie!</p>
      </div>

      <div className="user-profile-section">
        <form onSubmit={formik.handleSubmit}>
          <FormInputField label="Imię" name="firstName" formik={formik} />
          <FormInputField label="Nazwisko" name="lastName" formik={formik} />
          <FormInputField label="Email" name="email" disabled={true} formik={formik} />
          <FormInputField label="Numer telefonu" name="phoneNumber" formik={formik} />
          <FormInputField label="Hasło" name="password" type="password" formik={formik} />
          <div className="buttons">
            <ButtonForm isLoading={isUpdateUserDataLodaing} label={"Aktualizuj dane"} />
            {error && <div className="form-error">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;
