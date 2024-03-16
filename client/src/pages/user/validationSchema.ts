import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Poroszę podać imię."),
  lastName: Yup.string().required("Prodszę podać nazwisko."),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{9}$/, "Proszę podać prawidłowy numer telefonu.")
    .required("Proszę podać numer telefonu."),
  email: Yup.string().email("Proszę podać prawidłowy adres email.").required("Proszę podać adres email."),
  password: Yup.string().required("Aby zaktualizować dane, proszę podać hasło."),
});

export default validationSchema;
