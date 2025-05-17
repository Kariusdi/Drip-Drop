"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FC } from "react";

const columns: GridColDef[] = [
  {
    field: "saleDate",
    headerName: "Sale Date",
    width: 265,
    headerAlign: "center",
    sortable: true,
    align: "center",
  },
  {
    field: "quantities",
    headerName: "Quantities (Litre)",
    width: 265,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "proceeds",
    headerName: "Proceeds (thb)",
    width: 265,
    headerAlign: "center",
    align: "center",
  },
];

const paginationModel = { page: 0, pageSize: 10 };

interface AppTableProps {
  dataSource: {
    id: number;
    saleDate: string;
    quantities: number;
    proceeds: number;
  }[];
}

const AppTable: FC<AppTableProps> = ({ dataSource }) => {
  return (
    <Paper sx={{ height: "56%", width: "100%" }}>
      <DataGrid
        rows={dataSource ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        checkboxSelection={false}
        sx={{ border: 0, fontSize: "1.2rem" }}
      />
    </Paper>
  );
};

export default AppTable;
