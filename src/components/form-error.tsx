import React from "react";

interface IFormErrorProps {
  errorMessage: string;
  color?:string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-indigo-500">{errorMessage}</span>
);
