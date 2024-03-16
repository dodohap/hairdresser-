import { useFormik } from "formik";
import FormInputField from "../../formInputField/FormInputField";
import { useApi } from "../../../hooks/useApi";
import validationSchema from "./validationSchema";
import { UserForgetPasswordDataType } from "../../../types/User";
import ButtonForm from "../../ButtonForm";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { forgetPassword } from "../../../api/auth";
import { useAuthModal } from "../../../context/AuthModalContext";
import { ModalStateEnum } from "../../../types/AuthModal";

const ForgetPassword: React.FC = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" replace />;

  const { openModal } = useAuthModal();
  const { error, isLoading, isSuccess, mutate } = useApi<UserForgetPasswordDataType, unknown>(forgetPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      validationSchema.isValid(values).then(() => {
        mutate(
          {
            email: values.email,
          },
          {
            onSuccess: () => {
              setTimeout(() => openModal(ModalStateEnum.RESET_PASSWORD), 2000);
            },
          }
        );
      });
    },
  });

  if (isSuccess) {
    return (
      <div className="container">
        <h2 className="title">Na Twoje konto emial zostala wyslana wiadomosc z linkiem do resetu hasla!</h2>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormInputField label="Email" name="email" IconComponent={MdOutlineEmail} formik={formik} />
        <div className="buttons">
          <ButtonForm isLoading={isLoading} label={"Wyslij"} />
          {error && <div className="form-error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
