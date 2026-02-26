//! export default APIFunctionality;

class APIFunctionality {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //! 🔍 Search
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //! 🎯 Filter
  filter() {
    const queryCopy = { ...this.queryString };

    //! Remove unwanted fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);

    //! Convert operators (gt, gte, lt, lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //! 📄 Pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default APIFunctionality;
