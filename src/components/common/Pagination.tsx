import ReactPaginate from "react-paginate";
import {useState} from "react";
import './pagination.css'

type Props = {

};
export const Pagination = (props: Props) => {

    const [pageCount, setPageCount] = useState(10)

    function handlePageClick() {

    }

    return (
        <div style={{userSelect:'none'}}>
            <ReactPaginate
                className='commonPagination'
                breakLabel="..."
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel=""
                marginPagesDisplayed={1}
                activeClassName={'commonPagination__activePage'}
            />
        </div>
    );
};