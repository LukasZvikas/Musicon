import React, { FunctionComponent } from "react";
import "./Button.css";

interface ButtonProps {
  title: string;
  type: string;
  action: () => void;
  colors: { backgroundColor: string; color: string };
}
export const Button: FunctionComponent<ButtonProps> = ({
  title,
  type,
  action,
  colors,
  children
}) => {
  const onButtonClick = () => {
    action();
  };

  return (
    <div
      onClick={onButtonClick}
      className={`button__${type} d-flex align-items-center justify-content-center text-center`}
      style={{ backgroundColor: colors.backgroundColor, color: colors.color }}
    >
      {title}
      {children || null}
    </div>
  );
};
