import * as Yup from "yup";

const validationSchema = Yup.object({
  key: Yup.string().required("Proszę podać kod."),
  newPassword: Yup.string().min(8, "Hasło musi mieć co najmniej 8 znaków").required("Wymagane"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), "null"], "Hasła muszą się zgadzać")
    .required("Wymagane potwierdzenie hasła"),
});

export default validationSchema;
