import React, { useState, useEffect } from "react";
import axios from "axios";
import Styled from "styled-components";

const Cards = Styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const Card = Styled.div`
  margin: 2rem 6rem;
  padding: 1rem;
  background-color: #ffc357;
  box-shadow: 2px 2px #d88144;
  border-radius: 1.5rem;
`;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4088/projects")
      .then(res => {
        console.log("res.data", res.data);
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>List of Projects</h1>
      <Cards>
        {projects.map(singleProject => (
          <Card>
            <h3>Name: {singleProject.name}</h3>
            <h3>Description: {singleProject.description}</h3>
          </Card>
        ))}
      </Cards>
    </div>
  );
};

export default ProjectList;
