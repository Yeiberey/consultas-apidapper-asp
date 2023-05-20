import { Input } from "@chakra-ui/react";
import { buscarFacturas, buscarPersonas } from "../store/actions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Buscar = ({ setSearchText, searchText }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const array = pathname
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");
  const handleInputChange = async (event) => {
    setSearchText(event.target.value);
    if (array.length <= 1) {
      dispatch(buscarPersonas(event.target.value));
    } else if (array.length <= 3) {
      dispatch(buscarFacturas(event.target.value));
    }
  };
  return (
    <>
      {array.length <= 3 && (
        <Input
          value={searchText}
          margin={"10px 0"}
          variant="filled"
          placeholder="Buscar"
          onChange={handleInputChange}
        />
      )}
    </>
  );
};
export default Buscar;
