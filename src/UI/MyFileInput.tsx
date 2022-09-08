import React from "react";

export interface IMyFileInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyFileInput: React.FC<IMyFileInput> = ({ onChange }) => {
  return (
    <div>
      <input
        onChange={onChange}
        type="file"
        className="m-5 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
      />
    </div>
  );
};

export default MyFileInput;
