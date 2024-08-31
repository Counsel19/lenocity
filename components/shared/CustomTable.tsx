import { Table } from "@/components/ui/table";

import {  FC, ReactNode } from "react";
import CustomTableHeader from "./CustomTableHeader";
import TablePaginations from "./TablePaginations";

interface CustomTableProps {
  headingList: string[];
  tableBody: ReactNode;
  numberOfPages: number;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleSelectPage: (number: number) => void;
}

const CustomTable: FC<CustomTableProps> = ({
  headingList,
  tableBody,
  numberOfPages,
  currentPage,
  handlePrevPage,
  handleNextPage,
  handleSelectPage,
}) => {
  return (
    <div>
      <Table className="border-y mb-6 text-base">
        <CustomTableHeader headingList={headingList} />
        {tableBody}
      </Table>
      <TablePaginations
        numberOfPages={numberOfPages}
        handleSelectPage={handleSelectPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CustomTable;
