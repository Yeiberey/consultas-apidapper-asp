import { IconButton } from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { UserContext } from "../localStorage/LocalStorage";

const LogoutButton = ({ onClick }) => {
  const { setToken } = useContext(UserContext);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={() => setToken("")}
      icon={<CiLogout />}
      aria-label={`LogOut`}
    />
  );
};

export default LogoutButton;
