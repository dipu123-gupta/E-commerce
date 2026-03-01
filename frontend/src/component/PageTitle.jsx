import React, { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    // document.title = "Home-Ecommerce";
    document.title = title;
  }, [title]);
  return null;
};

export default PageTitle;
