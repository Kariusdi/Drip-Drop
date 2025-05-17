"use client";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";

interface DataRow {
  id: string; // your API returns string ids
  createdAt: string;
  oilVol: number;
  pricePerLiter: number;
  cash: number;
}

interface ApiResponse {
  message: string;
  data: DataRow[];
  totalCount: number;
}

const PAGE_SIZE = 10;

const AppTable: FC = () => {
  const t = useTranslations("TableComponent");

  // State for data, loading, and pagination
  const [rows, setRows] = useState<DataRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone");
    setPhoneNumber(phoneNumber ?? "");
  }, []);

  // Fetch data from your API
  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        // Note: API page param is 1-based, DataGrid page is 0-based
        const res = await fetch(
          `/api/cash?phone=${phoneNumber}&page=${page + 1}`
        );
        const json: ApiResponse = await res.json();
        setRows(json.data);
        setTotalRows(json.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [phoneNumber]
  );

  // Effect: fetch data when page changes
  useEffect(() => {
    if (phoneNumber) fetchData(paginationModel.page);
  }, [paginationModel.page, phoneNumber]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "createdAt",
        headerName: t("column1"),
        width: 200,
        headerAlign: "center",
        sortable: true,
        align: "center",
      },
      {
        field: "oilVol",
        headerName: t("column2"),
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "pricePerLiter",
        headerName: t("column3"),
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "cash",
        headerName: t("column4"),
        width: 200,
        headerAlign: "center",
        align: "center",
      },
    ],
    [t]
  );

  return (
    <Paper sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server" // key for server-side pagination
        pageSizeOptions={[PAGE_SIZE]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        checkboxSelection={false}
        sx={{ border: 0, fontSize: "1.2rem" }}
        rowCount={totalRows}
      />
    </Paper>
  );
};

export default AppTable;
