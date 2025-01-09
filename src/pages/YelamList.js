import React from "react";
import { data, columns } from "../assets/YelamData.js";
import YelamDataTable from "../components/YelamDataTable.js";

function YelamList() {
  return (
  <>
      <YelamDataTable title={"Yelam Entry List"} data={data} columns={columns} />
    </>
    );
}

export default YelamList;
