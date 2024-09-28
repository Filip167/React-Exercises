import React from "react";

function Coin({ side }) {
  return (
    <div className="Coin">
      {side && (
        <img
          src={side === "heads" ? "/images/heads.png" : "/images/tails.jpg"}
          alt={side}
        />
      )}
    </div>
  );
}

export default Coin;
