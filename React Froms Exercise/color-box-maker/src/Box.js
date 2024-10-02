import React from "react";

function Box({ id, width, height, backgroundColor, removeBox }) {
  return (
    <div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor,
          margin: '10px'
        }}
      />
      <button onClick={() => removeBox(id)}>X</button>
    </div>
  );
}

export default Box;
