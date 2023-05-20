import {
  SET_LOADING,
  GET_PERSONAS,
  GET_FACTURAS,
  GET_DETALLE_FACTURA,
  SET_FACTURAS,
  SET_DETALLE_FACTURA,
  BUSCAR_PERSONAS,
  BUSCAR_FACTURAS,
} from "./actions";

const initialState = {
  loading: {},
  token: undefined,
  personas: undefined,
  personasResult: [],
  facturasResult: [],
  facturas: undefined,
  detalle_factura: undefined,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      if (payload.del) {
        delete state.loading[payload.del];
      }
      if (payload.add) {
        state.loading = { ...state.loading, ...payload.add };
      }
      return { ...state };
    case GET_PERSONAS:
      return { ...state, ...payload };
    case BUSCAR_PERSONAS:
      const textNombre = payload.nombre.toLowerCase();
      const personasResult = state.personas?.filter((item) => {
        if (
          item.primerNombre.toLowerCase().includes(textNombre) ||
          item.segundoNombre.toLowerCase().includes(textNombre)
        ) {
          return true;
        }
        const nombreCompleto =
          item.primerNombre.toLowerCase() +
          " " +
          item.segundoNombre.toLowerCase();
        if (nombreCompleto.includes(textNombre)) {
          return true;
        }
        const nombreArray = [
          item.primerNombre.toLowerCase(),
          item.segundoNombre.toLowerCase(),
        ];
        const result = nombreArray.filter((e) => {
          if (e.includes(textNombre)) {
            return true;
          }
          if (
            textNombre.split(" ").filter((it) => {
              if (it.length) {
                return e.includes(it);
              }
              return false;
            }).length
          ) {
            return true;
          }
          return false;
        }).length;
        if (result) {
          return true;
        }
        return false;
      });

      return { ...state, ...{ personasResult } };
    case BUSCAR_FACTURAS:
      const number = payload.number.toLowerCase();
      const facturasResult = state.facturas?.filter((item) =>
        item.noDocumento.toLowerCase().includes(number)
      );

      return { ...state, ...{ facturasResult } };
    case GET_FACTURAS:
      return { ...state, ...payload };
    case SET_FACTURAS:
      return { ...state, ...payload };
    case GET_DETALLE_FACTURA:
      return { ...state, ...payload };
    case SET_DETALLE_FACTURA:
      return { ...state, ...payload };
    default:
      return state;
  }
}
export default reducer;
