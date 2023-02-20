import styles from './Pagination.module.css';

const Pagination = ({
    productsPerPage,
    totalProducts,
    paginateHandle,
    currentPage,
}) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const totalPagesArr = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    const maxPagesShowInPagination = 3; // Maximum number of pages to display
    let pageToShowArr = [];
    if (
        currentPage !=
            totalPagesArr.slice(
                currentPage - 1,
                currentPage - 1 + maxPagesShowInPagination
            )[Math.floor(maxPagesShowInPagination / 2)] &&
        currentPage !== totalPages
    ) {
        pageToShowArr = [
            ...totalPagesArr.slice(
                currentPage - 2,
                currentPage - 2 + maxPagesShowInPagination
            ),
        ];
    }

    if (currentPage === 1) {
        pageToShowArr = [
            ...totalPagesArr.slice(
                currentPage - 1,
                currentPage - 1 + maxPagesShowInPagination
            ),
        ];
    }
    if (currentPage === totalPages) {
        pageToShowArr = [
            ...totalPagesArr.slice(
                currentPage - maxPagesShowInPagination,
                currentPage
            ),
        ];
    }
    return pageToShowArr.map((numPage, index) => (
        <li
            className={`${styles['pagination-item']} ${
                currentPage === numPage ? styles['active'] : ''
            }`}
            key={index}
        >
            <button onClick={() => paginateHandle(numPage)}>{numPage}</button>
        </li>
    ));
};

export default Pagination;
