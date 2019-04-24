import React from "react";
import "./Button.css";

interface ButtonProps {
  genreName: string;
}
export const Button = ({ genreName }: ButtonProps) => {
  return <button className="button__primary">{genreName}</button>;
};
