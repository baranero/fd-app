import useUserList from "@/hooks/useUserList";
import useVacations from "@/hooks/useVacations";
import { mergeArr } from "@/utils/mergeArrays";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

interface DetailsListProps {
  columns: GridColDef[];
  rows: Record<string, any>[];
}

const DetailsList: React.FC<DetailsListProps> = ({ columns, rows }) => {
  return (
    <div className="text-white">
      <DataGrid
        className="w-full lg:w-[70%]"
        style={{
          color: "#FFF",
          background: "rgba(64, 64, 64)",
          padding: "0 20px",
          margin: "0 auto",
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default DetailsList;
