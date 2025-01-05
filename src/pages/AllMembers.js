import DataTable from "../components/DataTable.js";
import { data, columns } from "../assets/Data.js";
// import { Button } from "@mui/material";

const AllMembers = () => {
  return (
    <>
      <DataTable title={"All Members"} data={data} columns={columns} />
    </>
  );
};

export default AllMembers;
