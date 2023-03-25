import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function Admin() {
  const [sprint, setSprint] = useState([]);
  const [newsprint, setNewsprint] = useState("");
  const [resprint, setresprint] = useState("");
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("todo");
  const [task, setTask] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let user = JSON.parse(localStorage.getItem("loginuser")) || {};

  useEffect(() => {
    spr();
  }, [newsprint]);
  const spr = () => {
    fetch(`https://better-gown-lion.cyclic.app/sprint`)
      .then((res) => res.json())
      .then((res) => setSprint(res))
      .catch((err) => console.log(err));
  };

  const addspr = () => {
    fetch(`https://better-gown-lion.cyclic.app/sprint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user && user.user.name,
        sprint: newsprint,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res))
      .catch((err) => alert(err));
    setNewsprint("");
    window.location.reload();
  };
  const del = (id) => {
    fetch(`https://better-gown-lion.cyclic.app/sprint/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => alert("SPRINT IS DELETED"))
      .catch((err) => console.log(err));
    window.location.reload();
  };
  const respr = (id) => {
    fetch(`https://better-gown-lion.cyclic.app/sprint/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sprint: resprint }),
    })
      .then((res) => res.json())
      .then((res) => alert("SPRINT IS DELETED"))
      .catch((err) => console.log(err));
    window.location.reload();
  };
  const pretask = (id) => {
    localStorage.setItem("task", id);
    onOpen();
  };
  const addtask = () => {
    fetch(`https://better-gown-lion.cyclic.app/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        assignee: user && user.user.name,
        batch: batch,
        status: status,
        type: type,
        sprint: localStorage.getItem("task"),
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res))
      .catch((err) => alert(err));

    window.location.reload();
  };
  return (
    <Box>
      <Box>
        <Input
          placeholder="enter sprint no."
          type={"number"}
          onChange={(e) => setNewsprint(e.target.value)}
          w="50%"
        />
        <Button onClick={addspr}>Add sprint</Button>
      </Box>
      <Box gap={"20px"} justifyContent="space-evenly" bg={"blue.800"}>
        {sprint &&
          sprint.map((el) => (
            <Box
              display={"flex"}
              justifyItems={"center"}
              bg="blue.400"
              m="auto"
              p={"10px"}
              mt="10px"
              gap={"20px"}
            >
              <Heading>{el.name}</Heading>
              <Text>scheduled by {el.schduled}</Text>

              <Button onClick={() => pretask(el.name)}>Add Task</Button>
              <Input
                placeholder="enter rename sprint"
                type={"number"}
                onChange={(e) => setresprint(e.target.value)}
                w="50%"
                bg={"white"}
              />

              <Button onClick={() => respr(el._id)}>Rename Sprint</Button>
              <Button onClick={() => del(el._id)}>Delete</Button>
              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add New Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing={3}>
                      <Input
                        focusBorderColor="pink.400"
                        placeholder="enter task name"
                        onChange={(e) => setTask(e.target.value)}
                      />
                      <Input
                        isInvalid
                        errorBorderColor="red.300"
                        placeholder="sprint"
                        value={localStorage.getItem("task")}
                        disabled
                      />
                      <Input
                        isInvalid
                        errorBorderColor="crimson"
                        placeholder="task assignned by"
                        value={user && user.user.name}
                        disabled
                      />
                      <Select
                        placeholder="Select batch"
                        onChange={(e) => setBatch(e.target.value)}
                      >
                        <option value="web-19">WEB-19</option>
                        <option value="web-20">WEB-20</option>
                        <option value="web-21">WEB-21</option>
                      </Select>
                      <Select
                        placeholder="Select type"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="bug">Bug</option>
                        <option value="story">Story</option>
                        <option value="features">Features</option>
                      </Select>
                      <Input
                        placeholder="Select status"
                        value="todo"
                        onChange={(e) => setStatus("todo")}
                        disabled
                      ></Input>
                    </Stack>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost" onClick={addtask}>
                      Confirm Task
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Admin;
