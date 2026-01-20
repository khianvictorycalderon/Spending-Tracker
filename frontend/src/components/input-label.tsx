import { useId } from "react";

interface InputLabelProps<T> {
  label: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  type?: "text" | "number";
  className?: string;
}

export function InputLabel<T extends string | number>({
  label,
  value,
  setValue,
  type = "text",
  className = "",
}: InputLabelProps<T>) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: T;

    if (type === "number") {
      newValue = (e.target.value === "" ? "" : Number(e.target.value)) as T;
    } else {
      newValue = e.target.value as T;
    }

    setValue(newValue);
  };

  return (
    <div className={`flex flex-col gap-1`}>
      <label htmlFor={id} className="text-sm font-medium text-inherit text-left">
        {label}:
      </label>

      <input
        id={id}
        type={type}
        value={String(value)}
        onChange={handleChange}
        className={`
            ${className}
            rounded-lg border border-current
            bg-transparent px-3 py-2 text-sm text-inherit
            outline-none transition
            focus:ring-2 focus:ring-current focus:border-current
            disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />
    </div>
  );
}
