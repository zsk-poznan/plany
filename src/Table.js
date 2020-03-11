import React, { useEffect, useState } from "react";

function Table({ type, id }) {
  const [plan, setPlan] = useState(null);
  useEffect(() => {
    fetch(
      "https://kapskypl.github.io/planyn-backend/" + type + "/" + id + ".json"
    )
      .then(r => r.text())
      .then(string => JSON.parse(string))
      .then(setPlan);
  }, [type, id]);
  return <div></div>;
}

export default Table;
