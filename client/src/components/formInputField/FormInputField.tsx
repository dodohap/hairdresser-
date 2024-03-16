import "./FormInputFieldStyle.css";

import { CiUser, CiPhone } from "react-icons/ci";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";

interface FormInputFieldProps<T> {
  label: string;
  name: Extract<keyof T, string>;
  type?: string;
  disabled?: boolean;
  IconComponent?: any;
  formik: any;
}

const FormInputField = <T extends {}>({ label, name, type = "text", disabled = false, IconComponent, formik }: FormInputFieldProps<T>) => {
  const getDefaultIconComponent = () => {
    switch (name) {
      case "firstName":
      case "lastName":
        return <CiUser className="input-icon" />;
      case "phoneNumber":
        return <CiPhone className="input-icon" />;
      case "email":
        return <MdOutlineEmail className="input-icon" />;
      case "password":
        return <MdOutlineLock className="input-icon" />;
      default:
        return undefined;
    }
  };

  return (
    <div className="input-icon-container">
      {IconComponent && <IconComponent className="input-icon" />}
      {!IconComponent && getDefaultIconComponent()}
      <input id={name} type={type} disabled={disabled} className="input-style" placeholder={label} {...formik.getFieldProps(name)} />
      <p className="form-error">&nbsp;{formik.errors[name]?.toString()}</p>
    </div>
  );
};

export default FormInputField;
