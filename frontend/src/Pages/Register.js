import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [batch, setBatch] = useState("");
  const navigate = useNavigate();

  const register = () => {
    let data = { name: name, email: email, password: password };
    let x = email.split("@");
    if (x[1] === "masaischool") {
      data = { name: name, email: email, password: password };
    } else {
      data = { name: name, email: email, password: password, batch: batch };
    }
    fetch(`https://better-gown-lion.cyclic.app/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("registration is confirm");
        return navigate("/login");
      })
      .catch((err) => alert(err));
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register
          </Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormControl>
              </Box>
            </HStack>
            <Select
              placeholder="Select batch"
              onChange={(e) => setBatch(e.target.value)}
            >
              <option value="web-19">WEB-19</option>
              <option value="web-20">WEB-20</option>
              <option value="web-21">WEB-21</option>
            </Select>
            <label style={{ fontSize: "13px", color: "red" }}>
              Batch is Mandatory for all non-admin users
            </label>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <label style={{ fontSize: "13px", color: "red" }}>
              admin email should be demain-name as @masaischool.com
            </label>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={register}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} to="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
