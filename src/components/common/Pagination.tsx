import ReactPaginate from "react-paginate";
import {Dispatch, SetStateAction} from "react";
import './pagination.css'


type Props = {
    limit: number,
    totalItems: number,
    changePage: Dispatch<SetStateAction<number>>,
    currentPage: number
};
export const Pagination = (props: Props) => {


    function handlePageClick(selectedPage: { selected: number; }) {
        props.changePage(selectedPage.selected)
    }

    return (
        <div style={{userSelect: 'none'}}>
            <ReactPaginate
                className='commonPagination'
                breakLabel="..."
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={Math.ceil(props.totalItems / props.limit)}
                previousLabel=""
                marginPagesDisplayed={1}
                activeClassName={'commonPagination__activePage'}
            />
        </div>
    );
};