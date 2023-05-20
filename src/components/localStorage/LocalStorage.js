import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/actions";
import Swal from "sweetalert2";
// import dotenv from "dotenv";

export const UserContext = createContext();
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const [token, setToken] = useState(() => {
    try {
      const tokenLocal = localStorage.getItem("token");
      return tokenLocal ? tokenLocal : "";
    } catch (error) {
      return "";
    }
  });

  useEffect(() => {
    localStorage.setItem("token", token);
    // eslint-disable-next-line
  }, [token]);
  useEffect(() => {
    if (loading.getDBPersonas === 1) {
      dispatch(setLoading({ del: "getDBPersonas" }));
    } else if (loading.getDBFacturas === 1) {
      dispatch(setLoading({ del: "getDBFacturas" }));
    } else if (loading.getDBDetalleFacturas === 1) {
      dispatch(setLoading({ del: "getDBDetalleFacturas" }));
    } else {
      Swal.hideLoading();
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
