import React from "react";
import fileImage from "./folderstruct.webp";
import "./file.css";

const File = () => {
  return (
    <div className="image">
      <img src={fileImage} alt="fileImage" />
    </div>
  );
};

export default File;