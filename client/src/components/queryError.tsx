import React from "react";
import { SAVED_TRACKS_ERROR } from "../utilities/errorTypes";

interface QueryErrorProps {
    errorMessage: string;
    pushHistory: ({}) => void;
}

export const QueryError = ({ errorMessage, pushHistory }: QueryErrorProps) => {
    const renderNoTracksMessage = () => (
        <div className="heading__primary content-wrapper d-flex justify-content-center text-center px-4">
      You haven't saved any tracks yet.
        </div>
    );
    const determineError = (errorMessage: string) => {
        switch (errorMessage) {
            case SAVED_TRACKS_ERROR:
                return renderNoTracksMessage();
            default:
                pushHistory({
                    pathname: "/",
                    state: { authError: true }
                });
                return null;
        }
    };

    return determineError(errorMessage);
};
