import { Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import ButtonIcon from "./ButtonIcon";
import { getDBFacturas, getDBPersonas, setLoading } from "../store/actions";
import { FiRefreshCw } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "./localStorage/LocalStorage";
import { useLocation } from "react-router-dom";

const Actualizar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { token } = useContext(UserContext);
  return (
    <Flex
      w={"100%"}
      h={"48px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={"0 10px"}
    >
      <ButtonIcon
        onClick={async () => {
          const array = pathname
            .trim()
            .replace(/^\/+|\/+$/g, "")
            .split("/");
          await dispatch(setLoading({ add: { getDBPersonas: 2 } }));
          if (array.length <= 1) {
            await dispatch(getDBPersonas(token));
          } else if (array.length <= 3) {
            await dispatch(getDBFacturas("noIdentificacion", array[1], token));
          } else if (array.length <= 4) {
            await dispatch(getDBFacturas("noDocumento", array[3], token));
          }
          await dispatch(setLoading({ add: { getDBPersonas: 1 } }));
        }}
        Icon={FiRefreshCw}
      />
    </Flex>
  );
};
export default Actualizar;
