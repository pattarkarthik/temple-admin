import DataTable from "../components/DataTable.js";
import { data, columns } from "../assets/Data.js";


const AllMembers = () => {
  return (
    <>
      <DataTable title={"All Members"} data={data} columns={columns} />
    </>
  );
};

export default AllMembers;
