import React, { FunctionComponent } from "react";
import "./Button.css";

interface ButtonProps {
    title: string;
    type: string;
    action: () => void;
    colors: string;
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
            className={`button__${type} d-flex align-items-center justify-content-center text-center ${colors}`}
        >
            {title}
            {children || null}
        </div>
    );
};
