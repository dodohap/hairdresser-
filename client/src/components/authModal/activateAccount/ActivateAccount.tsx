import { useFormik } from "formik";
import FormInputField from "../../formInputField/FormInputField";
import { useApi } from "../../../hooks/useApi";
import validationSchema from "./validationSchema.ts";
import { UserActivateAccountRequestDataType, UserActivateAccountResponseDataType } from "../../../types/User.ts";
import ButtonForm from "../../ButtonForm";
import { MdOutlineEmail } from "react-icons/md";
import { activateAccount } from "../../../api/auth.ts";

const ActivateAccount: React.FC = () => {
  const { error, isLoading, isSuccess, mutate } = useApi<UserActivateAccountRequestDataType, UserActivateAccountResponseDataType>(activateAccount);

  const formik = useFormik({
    initialValues: {
      key: "",
    },
    validationSchema,
    onSubmit: (values) => {
      validationSchema.isValid(values).then(() => {
        mutate({
          key: values.key,
        });
      });
    },
  });

  if (isSuccess) {
    return (
      <div className="container">
        <h2 className="title">Sukces!</h2>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="title">Na podany adres email został wysłany kod aktywacyjny, podaj go poniżej.</h2>
      <FormInputField label="Kod" name="key" IconComponent={MdOutlineEmail} formik={formik} />
      <div className="buttons">
        <ButtonForm isLoading={isLoading} label={"Wyslij"} />
        {error && <div className="form-error">{error}</div>}
      </div>
    </form>
  );
};

export default ActivateAccount;
