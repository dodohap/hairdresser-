import i18n from "i18next";

type FormInputErrorProps = {
  error: string;
};

const ErrorComponent: React.FC<FormInputErrorProps> = ({ error }: { error: string }) => {
  const translateError = (error: string): string => {
    console.log("try to trtanslate: " + error);
    return i18n.t(`errors.${error}`, { defaultValue: "Brak tlumaczenia!" });
  };

  return <p className="form-error">{translateError(error)}</p>;
};

export default ErrorComponent;
