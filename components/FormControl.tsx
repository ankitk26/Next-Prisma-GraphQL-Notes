import { Dispatch, SetStateAction } from "react";

interface IProps {
  label: string;
  id: string;
  value: string;
  type: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function FormControl({
  label,
  id,
  value,
  type,
  setValue,
}: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          id={id}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
          onChange={(e) => setValue(e.target.value)}
          rows={5}
        />
      ) : (
        <input
          type={type}
          value={value}
          id={id}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}
