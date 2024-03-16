import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Poroszę podać imię."),
  lastName: Yup.string().required("Prodszę podać nazwisko."),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{9}$/, "Proszę podać prawidłowy numer telefonu.")
    .required("Proszę podać numer telefonu."),
  email: Yup.string().email("Proszę podać prawidłowy adres email.").required("Proszę podać adres email."),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), "null"], "Proszę podać prawidłowy adres email.")
    .required("Proszę potwierdzić adres email."),
  password: Yup.string().min(8, "Hasło musi mieć co najmniej 8 znaków").required("Proszę podać hasło."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "null"], "Proszę potwierdzić hasło.")
    .required("Proszę potwierdzić hasło."),
});

export default validationSchema;
