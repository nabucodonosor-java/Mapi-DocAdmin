import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import './styles.scss';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {
    const renderIcon = () => (
        <ArrowIcon
            className={`pagination-previous`}
            data-testid="arrow-icon-previous"
        />
    );

    return (
        <div className="pagination-container">
           <ReactPaginate 
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={selectedItem => onChange(selectedItem.selected)}
           /> 
           
        </div>
    );
}

export default Pagination;