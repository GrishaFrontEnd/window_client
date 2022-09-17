import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: any;
  ref?: React.RefObject<HTMLInputElement>;
  value?: string | number;
}

const MyInput: React.FC<InputProps> = ({
  placeholder,
  onChange,
  props,
  ref,
  value,
}) => {
  return (
    <div className="mb-2">
      <input
        ref={ref}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default MyInput;
