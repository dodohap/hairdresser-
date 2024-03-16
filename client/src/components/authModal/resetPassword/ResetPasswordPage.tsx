import { useFormik } from "formik";
import { useApi } from "../../../hooks/useApi";
import validationSchema from "./validationSchema";
import FormInputField from "../../formInputField/FormInputField";
import ButtonForm from "../../ButtonForm";
import { resetPassword } from "../../../api/auth";
import { MdOutlineLock, MdKey } from "react-icons/md";

const ResetPasswordPage: React.FC = () => {
  const { error, isLoading, isSuccess, mutate } = useApi(resetPassword);
  const formik = useFormik({
    initialValues: {
      key: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        {
          key: values.key,
          newPassword: values.newPassword,
        },
        {
          onSuccess: () => {},
        }
      );
    },
  });

  if (isSuccess) {
    return (
      <div className="container">
        <h2 className="title">Twoje haslo zostalo zmienione!</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="title">Proszę podać nowe hasło i klucz z email.</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormInputField label="Klucz resetu hasla" name="key" type="password" IconComponent={MdKey} formik={formik} />
        <FormInputField label="Nowe haslo" name="newPassword" type="password" IconComponent={MdOutlineLock} formik={formik} />
        <FormInputField label="Powtorz nowe haslo" name="confirmNewPassword" IconComponent={MdOutlineLock} type="password" formik={formik} />
        <div className="buttons">
          <ButtonForm isLoading={isLoading} label={"Wyslij"} />
          {error && <div className="form-error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
