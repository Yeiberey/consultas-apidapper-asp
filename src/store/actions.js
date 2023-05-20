import axios from "axios";
import Swal from "sweetalert2";

export const SET_LOADING = "SET_LOADING";
export const GET_PERSONAS = "GET_PERSONAS";
export const BUSCAR_PERSONAS = "BUSCAR_PERSONAS";
export const BUSCAR_FACTURAS = "BUSCAR_FACTURAS";
export const GET_FACTURAS = "GET_FACTURAS";
export const GET_DETALLE_FACTURA = "GET_DETALLE_FACTURA";
export const SET_FACTURAS = "SET_FACTURAS";
export const SET_DETALLE_FACTURA = "SET_DETALLE_FACTURA";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export function setLoading(value) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: value });
  };
}
export function postDBLogIn(isShowToast) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/generate-token`, {
        Username: "hilda",
      });
      if (isShowToast) {
        Toast.fire({
          icon: "success",
          title: "Autenticado",
        });
      }
      return response?.data.token;
    } catch ({ response }) {
      console.log(response);
      Toast.fire({
        icon: "warning",
        title: response?.statusText,
      });
      return false;
    }
  };
}
export function getDBPersonas(token, isShowToast) {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };
      const response = await axios.get(`/personas`, requestOptions);
      dispatch({ type: GET_PERSONAS, payload: { personas: response.data } });
      if (isShowToast) {
        Toast.fire({
          icon: "success",
          title: "Listo",
        });
      }
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response?.statusText,
      });
      return false;
    }
  };
}
export function buscarPersonas(nombre, isShowToast) {
  return async (dispatch) => {
    dispatch({ type: BUSCAR_PERSONAS, payload: { nombre } });
  };
}
export function buscarFacturas(number, isShowToast) {
  return async (dispatch) => {
    dispatch({ type: BUSCAR_FACTURAS, payload: { number } });
  };
}
export function getDBFacturas(type, number, token, isShowToast) {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };
      const response = await axios.get(
        `/facturas?type=${type}&number=${number}`,
        requestOptions
      );
      dispatch({
        type: type === "noIdentificacion" ? GET_FACTURAS : GET_DETALLE_FACTURA,
        payload:
          type === "noIdentificacion"
            ? { facturas: response.data }
            : { detalle_factura: response.data },
      });
      if (isShowToast) {
        Toast.fire({
          icon: "success",
          title: "Listo",
        });
      }
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response?.statusText,
      });
      return false;
    }
  };
}
export function setDBFacturas(isShowToast) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_FACTURAS,
        payload: { facturas: undefined },
      });
      if (isShowToast) {
        Toast.fire({
          icon: "success",
          title: "Listo",
        });
      }
      return true;
    } catch ({ response }) {
      return false;
    }
  };
}
export function setDBDetalleFactura() {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_DETALLE_FACTURA,
        payload: { detalle_factura: undefined },
      });
      return true;
    } catch ({ response }) {
      return false;
    }
  };
}
