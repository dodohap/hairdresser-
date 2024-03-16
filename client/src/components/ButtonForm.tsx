type ButtonFormPropsType = {
  isLoading: boolean;
  label: string;
};

const ButtonForm = ({ isLoading, label }: ButtonFormPropsType) => {
  return (
    <div>
      <button disabled={isLoading} className="button-form">
        {isLoading ? "Ladowanie..." : label}
      </button>
    </div>
  );
};

export default ButtonForm;
