import React from "react";
import "./Alert.css";

interface MessageProps {
  message: string;
  isSuccess: boolean;
}

export const Alert = ({ message, isSuccess }: MessageProps) => {
  return (
    <div
      className={`message message__success d-flex justify-content-center flex-column align-items-center p-3 ${
        isSuccess ? "message__success" : "message__error"
      }`}
    >
      <h5 className="text-white bg-transparent">
        {isSuccess ? "Success!" : "Error!"}
      </h5>
      <div className="text-white bg-transparent">{message}</div>
    </div>
  );
};
