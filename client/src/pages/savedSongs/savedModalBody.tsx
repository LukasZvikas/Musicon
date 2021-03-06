import React, { Fragment } from "react";
import { Button } from "../../components/button";

interface PlaylistModalProps {
    name: string;
    changeModalState: () => void;
    addToPlaylist: () => void;
}

export const PlaylistModalBody = ({
    name,
    changeModalState,
    addToPlaylist
}: PlaylistModalProps) => {
    return (
        <Fragment>
            <div className="heading__primary-small bg-white text-center m-3">
        Confirmation
            </div>
            <div className="heading__secondary-small bg-white text-center bg-white">
        Are you sure you want to add these songs to "{name}"?
            </div>
            <div className="d-flex bg-white">
                <Button
                    type={"primary"}
                    title={"Cancel"}
                    action={() => {
                        changeModalState();
                    }}
                    colors={"bg-primary text-white"}
                />
                <Button
                    type={"primary"}
                    title={"Add it"}
                    action={() => {
                        addToPlaylist();
                        changeModalState();
                    }}
                    colors={"bg-green text-white"}
                />
            </div>
        </Fragment>
    );
};
