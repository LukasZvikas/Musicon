import React from "react";
import "./SuccessMessage.css";

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <div className="message__success d-flex justify-content-center flex-column align-items-center p-3">
      <h5 className="text-white bg-transparent">Success!</h5>
      <div className="text-white bg-transparent">{message}</div>
    </div>
  );
};
