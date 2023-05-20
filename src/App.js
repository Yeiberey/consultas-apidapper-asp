import Header from "./components/Header.jsx";
import Tabla from "./components/Tabla.jsx";
import "./App.css";
import { Flex } from "@chakra-ui/react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Actualizar from "./components/Actualizar.jsx";
import ButtonIcon from "./components/ButtonIcon.jsx";
import { AiFillEye } from "react-icons/ai";
import TablaFacturas from "./components/Tabla.jsx";
import {
  getDBFacturas,
  getDBPersonas,
  setDBDetalleFactura,
  setDBFacturas,
  setLoading,
} from "./store/actions.js";
import { useDispatch } from "react-redux";
import Buscar from "./components/Buscar.jsx";
import { useState } from "react";

function App() {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  return (
    <div className="App">
      <Flex textAlign="center" flex={1} direction={"column"}>
        <Header></Header>
        <Flex
          p={"0 10px"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex
            flex={1}
            flexDir="column"
            alignItems={"center"}
            justifyContent="space-between"
            maxW={"80rem"}
          >
            <Actualizar />
            <Buscar setSearchText={setSearchText} searchText={searchText} />
            <Routes>
              <Route
                strict
                path={"/personas"}
                element={
                  <TablaFacturas
                    key={"personas"}
                    DataMemoArrayP={({ personas, personasResult }) => {
                      return searchText.length ? [personasResult] : [personas];
                    }}
                    DataMemoPF={({ personas, personasResult }) => {
                      return () =>
                        searchText.length ? personasResult : personas || [];
                    }}
                    useEffectPF={({
                      token,
                      personas,
                      facturas,
                      detalle_factura,
                    }) => {
                      return () => {
                        // if (searchText.length) {
                        //   setSearchText("");
                        // }
                        async function ejet() {
                          if (!personas) {
                            await dispatch(
                              setLoading({ add: { getDBPersonas: 2 } })
                            );
                            await dispatch(getDBPersonas(token));

                            await dispatch(
                              setLoading({ add: { getDBPersonas: 1 } })
                            );
                          }
                          if (facturas) {
                            dispatch(setDBFacturas());
                          }
                          if (detalle_factura) {
                            dispatch(setDBDetalleFactura());
                          }
                        }
                        ejet();
                      };
                    }}
                    DataUseEfectArrayP={({ personasResult }) => {
                      return [personasResult];
                    }}
                    action={() => {
                      return [
                        {
                          Header: "N° Ident.",
                          accessor: "noIdentificacion",
                        },
                        {
                          Header: "Nombre",
                          accessor: (row) =>
                            `${row.primerNombre} ${row.segundoNombre}`,
                        },
                        {
                          Header: "Action",
                          Cell: ({ row }) => {
                            return (
                              <Link
                                to={`/personas/${row.original.noIdentificacion}/facturas`}
                              >
                                <ButtonIcon Icon={AiFillEye} />
                              </Link>
                            );
                          },
                        },
                      ];
                    }}
                  />
                }
              />
              <Route
                exact
                path={"/personas/:noIdentificacion/facturas"}
                element={
                  <Tabla
                    key={getRandomNumber(1, 100)}
                    DataMemoArrayP={({ facturas, facturasResult }) => {
                      return searchText.length ? [facturasResult] : [facturas];
                    }}
                    DataMemoPF={({ facturas, facturasResult }) => {
                      return () =>
                        searchText.length ? facturasResult : facturas || [];
                    }}
                    useEffectPF={({ facturas, noIdentificacion, token }) => {
                      return () => {
                        dispatch(setDBDetalleFactura());
                        async function ejet() {
                          if (!facturas) {
                            setSearchText("");
                            await dispatch(
                              setLoading({ add: { getDBFacturas: 2 } })
                            );
                            await dispatch(
                              getDBFacturas(
                                "noIdentificacion",
                                noIdentificacion,
                                token
                              )
                            );
                            await dispatch(
                              setLoading({ add: { getDBFacturas: 1 } })
                            );
                          }
                        }
                        ejet();
                      };
                    }}
                    DataUseEfectArrayP={({ facturasResult }) => {
                      return [facturasResult];
                    }}
                    action={({ noIdentificacion }) => {
                      return [
                        {
                          Header: "N° Doc.",
                          accessor: "noDocumento",
                        },
                        {
                          Header: "Action",
                          Cell: ({ row }) => {
                            return (
                              <Link
                                to={`/personas/${noIdentificacion}/facturas/${row.original.noDocumento}`}
                              >
                                <ButtonIcon Icon={AiFillEye} />
                              </Link>
                            );
                          },
                        },
                      ];
                    }}
                  />
                }
              />
              <Route
                exact
                path={"/personas/:noIdentificacion/facturas/:noDocumento"}
                element={
                  <TablaFacturas
                    key={getRandomNumber(1, 100)}
                    DataMemoArrayP={({ detalle_factura }) => {
                      return [detalle_factura?.productos];
                    }}
                    DataMemoPF={({ detalle_factura }) => {
                      return () => detalle_factura?.productos || [];
                    }}
                    useEffectPF={({
                      detalle_factura,
                      facturas,
                      noIdentificacion,
                      noDocumento,
                      token,
                    }) => {
                      return () => {
                        async function ejet() {
                          if (detalle_factura) {
                            if (
                              noIdentificacion ===
                              detalle_factura.noIdentificacion
                            ) {
                              if (!facturas) {
                                await dispatch(
                                  setLoading({ add: { getDBFacturas: 2 } })
                                );
                                await dispatch(
                                  getDBFacturas(
                                    "noIdentificacion",
                                    noIdentificacion,
                                    token
                                  )
                                );
                                await dispatch(
                                  setLoading({ add: { getDBFacturas: 1 } })
                                );
                              }
                            } else {
                              navigate("/personas");
                            }
                          } else {
                            await dispatch(
                              setLoading({ add: { getDBDetalleFacturas: 2 } })
                            );
                            await dispatch(
                              getDBFacturas("noDocumento", noDocumento, token)
                            );
                            await dispatch(
                              setLoading({ add: { getDBDetalleFacturas: 1 } })
                            );
                          }
                        }
                        ejet();
                      };
                    }}
                    DataUseEfectArrayP={({ noDocumento, detalle_factura }) => {
                      return [noDocumento, detalle_factura];
                    }}
                    action={() => {
                      return [
                        {
                          Header: "Cant.",
                          accessor: "cantidadSalida",
                        },
                        {
                          Header: "Descrip",
                          accessor: "descripcionLarga",
                        },
                        {
                          Header: "Unit.",
                          accessor: "precioUnitario",
                        },
                        {
                          Header: "Total",
                          accessor: "total",
                        },
                      ];
                    }}
                  />
                }
              />
            </Routes>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
