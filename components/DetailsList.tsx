import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DetailsListProps {
  columns: GridColDef[];
  rows: Record<string, any>[];
}

const DetailsList: React.FC<DetailsListProps> = ({ columns, rows }) => {
  return (
    <div className="text-white mt-16">
      <DataGrid
        className="w-full"
        style={{
          color: "#FFF",
          background: "rgba(64, 64, 64)",
          padding: "20px",
          margin: "0 auto",
          borderRadius: "8px",
        }}
        rows={rows}
        columns={columns}
        
        pageSizeOptions={[5, 10]}
        autoHeight
      />
    </div>
  );
};

export default DetailsList;
