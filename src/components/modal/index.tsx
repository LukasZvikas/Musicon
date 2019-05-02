import React, { FunctionComponent } from "react";
import "./Modal.css";

interface ModalProps {
  show: boolean;
}
export const Modal: FunctionComponent<ModalProps> = ({ children, show }) => {
  return (
    <div
      className={`custom-modal d-flex justify-content-center align-items-center ${
        !show && "hide-modal"
      }`}
    >
      <div className="custom-modal__form d-flex justify-content-center align-items-center flex-column p-3">
        {children}
        
      </div>
    </div>
  );
};
