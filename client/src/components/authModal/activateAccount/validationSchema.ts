import * as Yup from "yup";

const validationSchema = Yup.object({
  key: Yup.string().required("Proszę podać kod."),
});

export default validationSchema;
