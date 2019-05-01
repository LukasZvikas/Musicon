import React from "react";
import "./Button.css";

interface ButtonProps {
  title: string;
  type: string;
  action: () => void;
  fill?: boolean;
}
export const Button = ({ title, type, action, fill }: ButtonProps) => {
  const onButtonClick = () => {
    action();
  };

  return (
    <div
      onClick={onButtonClick}
      className={`button__${type} d-flex align-items-center justify-content-center`}
      style={fill ? { backgroundColor: "rgb(255, 78, 80)", color: "#fff" } : {}}
    >
      {title}
    </div>
  );
};
