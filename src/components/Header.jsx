import React, { useContext } from "react";
import {
  Box,
  Center,
  Flex,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./localStorage/LocalStorage";
import Login from "./Login/Login";
import Logout from "./Login/Logout";
import { useSelector } from "react-redux";

export default function HeaderComponent() {
  const location = useLocation();
  const { token } = useContext(UserContext);
  const { loading } = useSelector((state) => state);

  const title = () => {
    const { pathname } = location;
    const array = pathname
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .split("/");
    return (
      <>
        Home/
        {array.map((e, i) => {
          if (e === "personas") {
            return (
              <b key={i}>
                <font color="#1572B6">
                  <Link to={"/personas"}>{e}/</Link>
                </font>
              </b>
            );
          } else if (e === "facturas") {
            return (
              <b key={i}>
                <font color="#1572B6">
                  <Link to={`/personas/${array[1]}/facturas`}>{e}/</Link>
                </font>
              </b>
            );
          } else {
            return e + "/";
          }
        })}
      </>
    );
  };
  const bgSpace = useColorModeValue("#EDF2F7", "black.700");
  const boxShadow = useColorModeValue(
    "0 0 10px 2px rgba(0, 0, 0, 0.4), 0 0 80px 1px rgba(0, 0, 0, 0.25)",
    "0 0 10px 2px rgba(255, 255, 255, 0.2), 0 0 80px 1px rgba(255, 255, 255, 0.15)"
  );
  const bgHeader = useColorModeValue("white.100", "rgba(0, 0, 0, 0.500)");
  return (
    <Flex flexDirection="column">
      <>
        <Box h={"60px"} bg={bgSpace} />
        <Flex
          w={"full"}
          position="fixed"
          zIndex={100}
          boxShadow={boxShadow}
          bg={bgHeader}
          backdropFilter={"blur(5px)"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex
            w={"100%"}
            maxW={"80rem"}
            pl={2}
            pr={2}
            h={"48px"}
            justifyContent={"space-between"}
          >
            <Center>
              <Text ml={3} noOfLines={1} as={"b"} wordBreak={"break-word"}>
                {title()}
              </Text>
            </Center>
            <Center>
              {token.length ? <Logout /> : <Login />}
              <ColorModeSwitcher justifySelf="flex-end" />
            </Center>
          </Flex>
          {!!Object.keys(loading).length && (
            <Progress w={"full"} size="xs" isIndeterminate />
          )}
        </Flex>
      </>
    </Flex>
  );
}
