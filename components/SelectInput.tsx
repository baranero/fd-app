interface SelectInputProps {
  id: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string | number;
  label: string;
  options: { value: string | number; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  onChange,
  value,
  label,
  options,
}) => {
  return (
    <div className="relative">
      <label
        className="
              absolute
              text-md
              text-zinc-100
              duration-150
              transform
              -translate-y-3
              scale-75
              top-4
              z-10
              origin-[0]
              left-6
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-3
            "
        htmlFor={id}
      >
        {label}
      </label>

      <select
        className="
                        block
                        rounded-md
                        px-5

                        pt-6
                        pb-1
                        
                        w-full
                        text-md
                        text-white
                        bg-neutral-400
                        
                        focus:outline-none
                        focus:ring-0
                        peer
                        
                                        "
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      >
        <option value="">-Select-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
