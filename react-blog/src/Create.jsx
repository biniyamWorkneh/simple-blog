import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, SetTask] = useState();
  const handleAdd = () => {
    axios
      .post("http://localhost:5000/add", { task: task })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <div className="create_form">
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => SetTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
