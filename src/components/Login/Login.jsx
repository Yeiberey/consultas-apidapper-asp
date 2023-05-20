import { IconButton } from "@chakra-ui/react";
import { BiLogIn } from "react-icons/bi";
import { postDBLogIn } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../localStorage/LocalStorage";

const LoginButton = () => {
  const { setToken } = useContext(UserContext);
  const dispatch = useDispatch();
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={async () => setToken(await dispatch(postDBLogIn()))}
      icon={<BiLogIn />}
      aria-label={`LogIn`}
    />
  );
};

export default LoginButton;
