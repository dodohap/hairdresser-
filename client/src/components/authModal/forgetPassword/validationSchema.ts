import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Proszę podać prawidłowy adres email.").required("Proszę podać email."),
});

export default validationSchema;
