import React from "react";
import "../componentStyles/Pagination.css";
import { useSelector } from "react-redux";

const Pagination = ({
  currentPage,
  onPageChange,
  activeClass = "active",
  nextPageText = "Next",
  prevPageText = "Prev",
  firstPageText = "First",
  lastPageText = "Last",
}) => {
  const { totalPages, products } = useSelector((state) => state.product);
  if (totalPages <= 1 || products?.length <= 0) return null;
  //   generate page number array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    for (
      let i = Math.max(currentPage - pageWindow, 1);
      i <= Math.min(currentPage + pageWindow, totalPages);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <div className="pagination">
      {/* first and prev button */}
      {currentPage > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>
            {firstPageText}
          </button>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {prevPageText}
          </button>
        </>
      )}

      {/* page numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? activeClass : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* last and next button */}
      {currentPage < totalPages && (
        <>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
          >
            {nextPageText}
          </button>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(totalPages)}
          >
            {lastPageText}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;

//! import React from "react";
// import "../componentStyles/Pagination.css";
// import { useSelector } from "react-redux";

// const Pagination = ({ currentPage, onPageChange }) => {
//   const { totalPages } = useSelector((state) => state.product);

//   if (totalPages <= 1) return null;

//   const pageWindow = 2;

//   const startPage = Math.max(1, currentPage - pageWindow);
//   const endPage = Math.min(totalPages, currentPage + pageWindow);

//   const pages = [];

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="pagination">
//       {/* Prev button */}
//       <button
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         Prev
//       </button>

//       {/* Page numbers */}
//       {pages.map((page) => (
//         <button
//           key={page}
//           className={page === currentPage ? "active" : ""}
//           onClick={() => onPageChange(page)}
//         >
//           {page}
//         </button>
//       ))}

//       {/* Next button */}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

// ! new code of pagination
// import React from "react";
// import { useSelector } from "react-redux";
// import "../componentStyles/Pagination.css";

// const Pagination = ({ currentPage, onPageChange }) => {
//   const { totalPages } = useSelector((state) => state.product);

//   if (totalPages <= 1) return null;

//   const getPages = () => {
//     const pages = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       if (currentPage <= 4) {
//         pages.push(1, 2, 3, 4, 5, "...", totalPages);
//       } else if (currentPage >= totalPages - 3) {
//         pages.push(
//           1,
//           "...",
//           totalPages - 4,
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages,
//         );
//       } else {
//         pages.push(
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages,
//         );
//       }
//     }

//     return pages;
//   };

//   const pages = getPages();

//   return (
//     <div className="pagination">
//       {/* First */}
//       <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
//         First
//       </button>

//       {/* Prev */}
//       <button
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         Prev
//       </button>

//       {/* Page Numbers */}
//       {pages.map((page, index) =>
//         page === "..." ? (
//           <span key={index} className="dots">
//             ...
//           </span>
//         ) : (
//           <button
//             key={index}
//             className={page === currentPage ? "active" : ""}
//             onClick={() => onPageChange(page)}
//           >
//             {page}
//           </button>
//         ),
//       )}

//       {/* Next */}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         Next
//       </button>

//       {/* Last */}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(totalPages)}
//       >
//         Last
//       </button>
//     </div>
//   );
// };

// export default Pagination;
