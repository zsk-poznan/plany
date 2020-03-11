import React, { useEffect, useState } from "react";
import "./App.css";

import { Button } from "@zsk-poznan/ui";
import Table from "./Table.js";

const classRegex = /\/classes\/(.*)\.json/;
const teacherRegex = /\/teachers\/(.*)\.json/;
const classroomRegex = /\/rooms\/(.*)\.json/;

const SortObjects = array => {
  let c = [];
  let t = [];
  let r = [];
  array.forEach(element => {
    let m = element.match(classRegex);
    if (m && m[1] !== "unknown") c.push(m[1]);
    m = element.match(teacherRegex);
    if (m && m[1] !== "unknown") t.push(m[1]);
    m = element.match(classroomRegex);
    if (m && m[1] !== "unknown") r.push(m[1]);
  });
  console.log(c);
  return { c, t, r };
};

function App() {
  const [classes, setClasses] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [classrooms, setClassrooms] = useState(null);

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    fetch("https://kapskypl.github.io/planyn-backend/list.json")
      .then(r => r.text())
      .then(string => JSON.parse(string))
      .then(array => SortObjects(array))
      .then(({ c, t, r }) => {
        setClasses(c);
        setTeachers(t);
        setClassrooms(r);
      });
  }, []);

  function ShowClass(event) {
    const button = event.target;
    const content = button.innerHTML;
    setShowMenu(false);
    /*fetch(
      "https://kapskypl.github.io/planyn-backend/" + content + ".json"
    ).then();*/
  }

  return (
    <div className="App">
      <h1> Plany </h1>
      {showMenu ? (
        <div className="Menu">
          <h2> Klasy </h2>
          {classes
            ? classes.map(c => (
                <Button className="btn" key={c} onClick={ShowClass}>
                  {c}
                </Button>
              ))
            : "Loading"}
          <h2> Nauczyciele </h2>
          {teachers
            ? teachers.map(t => (
                <Button className="btn" key={t}>
                  {t}
                </Button>
              ))
            : "Loading"}
          <h2> Sale </h2>
          {classrooms
            ? classrooms.map(r => (
                <Button className="btn" key={r}>
                  {r}
                </Button>
              ))
            : "Loading"}
        </div>
      ) : (
        <Table type="rooms" id="42"></Table>
      )}
    </div>
  );
}

export default App;
