import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Hooks/Redux";
import { setCurrentPage } from "../../Store/Slices/ItemSlice";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, items, pageCount } = useAppSelector(
    (state) => state.itemReducer
  );
  let arrNum: number[] = [];
  for (let i = 1; i <= pageCount; i++) {
    arrNum.push(i);
  }
  const handleClickPagination = (
    e: React.MouseEvent<HTMLLIElement>,
    num: number
  ) => {
    dispatch(setCurrentPage(num));
  };
  return (
    <nav
      aria-label="Page navigation example"
      className="flex justify-center mt-4"
    >
      <ul className="cursor-pointer inline-flex items-center -space-x-px">
        <li onClick={(e) => handleClickPagination(e, currentPage - 1)}>
          <div className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </li>
        {arrNum.map((item, index) => (
          <li key={index} onClick={(e) => handleClickPagination(e, item)}>
            <div className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {item}
            </div>
          </li>
        ))}
        <li onClick={(e) => handleClickPagination(e, currentPage + 1)}>
          <div className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
