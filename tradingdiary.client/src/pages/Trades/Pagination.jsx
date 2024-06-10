import { useEffect, useState } from "react";
import "./Pagination.css"

function Pagination({ currPage, pages, handleChange }) {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        getNum();
    }, [currPage])

    return (
        <div className="pagination-container">
            <ul className="pagination">
                {currPage > 1 &&
                    <li id="first">
                        <a role="button" onClick={() => handleChange(1)}>First</a>
                    </li>}

                {pageNumbers.map((number) =>
                    <li key={number} className={`page ${currPage === number ? "active" : ""}`} >
                        <a role="button" onClick={() => handleChange(number)}>{number}</a>
                    </li>
                )}

                {currPage < pages &&
                    <li id="last">
                        <a role="button" onClick={() => handleChange(pages)}>Last</a>
                    </li>}
            </ul>
        </div>
    )

    function getNum() {
        const numbers = [];
        if (currPage == 1) {
            for (let i = 1; i <= pages; i++) {
                numbers.push(i);
                if (numbers.length >= 3) {
                    break;
                }
            }
        } else if (currPage == pages) {
            for (let i = currPage; i >= 1; i--) {
                numbers.push(i);
                if (numbers.length >= 3) {
                    break;
                }
            }
            numbers.reverse();
        } else {
            numbers.push(currPage - 1);
            numbers.push(currPage);
            numbers.push(currPage + 1);
        }
        setPageNumbers(numbers);
    }
}

export default Pagination