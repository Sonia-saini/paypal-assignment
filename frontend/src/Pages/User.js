import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function User() {
  const [sprint, setSprint] = useState([]);
  const [task, setTask] = useState([]);
  let user = JSON.parse(localStorage.getItem("loginuser")) || {};

  useEffect(() => {
    spr();
  }, []);
  const spr = () => {
    fetch(`https://better-gown-lion.cyclic.app/sprint`)
      .then((res) => res.json())
      .then((res) => setSprint(res))
      .catch((err) => console.log(err));
  };
  const showtask = (name) => {
    setTask([]);
    fetch(
      `https://better-gown-lion.cyclic.app/task?sprint=${name}&batch=${
        user && user.user.batch
      }`
    )
      .then((res) => res.json())
      .then((res) => setTask(res))
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <Box>
        {sprint &&
          sprint.map((el) => {
            return (
              <Box display={"flex"} m="auto" gap="30px">
                <Text>{el.name}</Text>
                <Button onClick={() => showtask(el.name)}>show task</Button>
              </Box>
            );
          })}
      </Box>
      <Box>
        {task.length > 0 ? (
          task.map((el) => {
            return (
              <Box>
                <Text>Task type:- {el.type}</Text>
                <Text>Task status:- {el.status}</Text>
                <Text>Task task:- {el.task}</Text>
                <Text>Task sprint:- {el.sprint}</Text>
                <Text>Task assignee:- {el.assignee}</Text>
                <Text>Task batch:- {el.batch}</Text>
              </Box>
            );
          })
        ) : (
          <Heading>no task in this sprint</Heading>
        )}
      </Box>
    </Box>
  );
}

export default User;
