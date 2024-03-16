import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Proszę podać prawidłowy adres email.").required("Proszę podać adres email."),
  password: Yup.string().required("Proszę podać hasło."),
});

export default validationSchema;
