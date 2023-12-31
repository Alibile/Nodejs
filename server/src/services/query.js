
const DEFUALT_PAGE_LIMIT = 50;
const DEFUALT_PAGE_NUMBER = 1;
function getPagination(query) {
    const page = Math.abs(query.page) || DEFUALT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFUALT_PAGE_LIMIT;
    const skip =(page-1)*limit;

    return {
        skip,
        limit
    }
 }

 module.exports = {getPagination};