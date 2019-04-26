import React from "react";
import { Card } from "./card/Card";
import { Button } from "../../components/button";
import "../../Shared.css";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <Card />
      <div className="dashboard__heading-wrapper mb-2 mt-2">
        <div className="heading__primary m-1 text-center">ZEZE</div>
        <div className="heading__secondary mt-2 text-white">
          Kodak Black, Offset, Travis Scott
        </div>
        <video className="dashboard__video" controls autoplay name="media">
          <source
            src="https://p.scdn.co/mp3-preview/6ccc75509be729ffb01b1df3a8183e4e88dc6303?cid=774b29d4f13844c495f206cafdad9c86"
            type="audio/mpeg"
          />
        </video>
      </div>

      <Button
        type={"primary"}
        title={"Add to playlist"}
        action={() => {}}
        fill={"rgb(255, 78, 80)"}
      />
    </div>
  );
};

export default Dashboard;
