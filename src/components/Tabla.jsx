import React, { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillHome,
  AiOutlineNumber,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { UserContext } from "./localStorage/LocalStorage";
import {
  Flex,
  Text,
  Tr,
  Table,
  Thead,
  Th,
  chakra,
  Tbody,
  Td,
  Wrap,
  WrapItem,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSortBy, useTable } from "react-table";
import { BiUser } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";

const Tabla = ({
  action,
  useEffectPF,
  DataUseEfectArrayP,
  DataMemoPF,
  DataMemoArrayP,
}) => {
  const { noIdentificacion, noDocumento } = useParams();
  const { token } = useContext(UserContext);
  const {
    facturas,
    detalle_factura,
    facturasResult,
    personas,
    personasResult,
  } = useSelector((state) => state);
  const data = useMemo(
    DataMemoPF({
      facturas,
      detalle_factura,
      facturasResult,
      personas,
      personasResult,
    }),
    DataMemoArrayP({
      facturas,
      detalle_factura,
      facturasResult,
      personas,
      personasResult,
    })
  );

  const columns = useMemo(() => action({ noIdentificacion, noDocumento }), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  useEffect(
    useEffectPF({
      facturas,
      detalle_factura,
      noIdentificacion,
      noDocumento,
      token,
      personas,
    }),
    DataUseEfectArrayP({
      noIdentificacion,
      noDocumento,
      detalle_factura,
      personas,
      personasResult,
    })
  );
  const bgBox = useColorModeValue("rgba(21, 114, 182,.2)", "rgba(0,0,0,.3)");

  return (
    <Flex flexDirection={"column"} w={"full"} noOfLines={1}>
      {facturas && !!facturas.length && (
        <Wrap spacing="20px" align="center" fontSize={12}>
          <WrapItem>
            <Center p={"10px"} bg={bgBox} rounded={10}>
              <AiOutlineNumber /> {"_ "}
              {facturas[0].noIdentificacion}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center p={"10px"} bg={bgBox} rounded={10}>
              <BiUser />
              {"_ "}
              {facturas[0].primerNombre + " " + facturas[0].segundoNombre}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center p={"10px"} bg={bgBox} rounded={10}>
              <AiFillHome />
              {"_ "}
              {facturas[0].direccion}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center p={"10px"} bg={bgBox} rounded={10}>
              <BsFillBuildingsFill />
              {"_ "}
              {facturas[0].departamento}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center p={"10px"} bg={bgBox} rounded={10}>
              <BsFillBuildingsFill />
              {"_ "}
              {facturas[0].ciudad}
            </Center>
          </WrapItem>
        </Wrap>
      )}
      {facturas && (
        <Text margin={"10px 0"} textAlign={"start"}>
          Facturas:{" "}
          {detalle_factura
            ? detalle_factura.noDocumento
            : facturas && facturas.length}
        </Text>
      )}
      <Table
        sx={{ "@media screen and (max-width: 600px)": { fontSize: "12px" } }}
        style={{ width: "full" }}
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <Th
                    key={column.id}
                    color={"#1572B6"}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                    textAlign={column.Header === "Total" ? "end" : "start"}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <AiFillCaretDown aria-label="sorted descending" />
                        ) : (
                          <AiFillCaretUp aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <Td
                      key={cell.id}
                      wordBreak={"break-word"}
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                      textAlign={
                        cell.column.Header === "Total" ? "end" : "start"
                      }
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex m={"20px 0"} justifyContent={"end"}>
        {detalle_factura &&
          (() => {
            let sum = 0;
            detalle_factura.productos.forEach((e) => {
              sum += e.total;
            });
            return <b>Total: ${sum}</b>;
          })()}
      </Flex>
    </Flex>
  );
};

export default Tabla;
