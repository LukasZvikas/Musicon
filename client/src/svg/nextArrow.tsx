import React from "react";

interface FrontArrowProps {
    action: () => void;
}

export const NextArrow = ({ action }: FrontArrowProps) => {
    return (
        <div onClick={action}>
            <svg version="1.1" viewBox="0 0 240.823 240.823" height="40" width="40">
                <path
                    fill="#fff"
                    d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
       l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
       C187.881,124.315,187.881,116.495,183.189,111.816z"
                />
            </svg>
        </div>
    );
};
