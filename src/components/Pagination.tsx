import { FC } from 'react';
import styles from "./pagination.module.css"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                &laquo;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    disabled={currentPage === i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
            >
                &raquo;
            </button>
        </div>
    );
};