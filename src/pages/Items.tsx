import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./items.module.css";
import LoadingScreen from "../components/LoadingScreen";
import { Item } from "../types/types";
import { fetchItems } from "../api/fetchItems";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";

const Items = () => {
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState<Item[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 60;

    useEffect(() => {
        loadItems(" ")
    }, [])

    const loadItems = async (url: string) => {
        setIsLoading(true);
        const uniqueItem = await fetchItems(url);
        setItems(uniqueItem)
        setIsLoading(false)
    }

    const filteredItems = items?.filter((item) => {
        return item.name.toLowerCase().match(query.toLowerCase())
    })

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

    const paginatedData = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading || !items) {
        return <LoadingScreen />
    }

    return (
        <>
            <Header query={query} setQuery={setQuery} />
            <main className={styles.main}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
                <nav className={styles.nav}>
                    {paginatedData?.map((item) => {
                        return (
                            <Link
                                key={item.id}
                                className={styles.listItem}
                                to={`/items/${item.name}`}
                            >
                                <img
                                    className={styles.listItemIcon}
                                    src={item.imgSrc}
                                    alt={item.name}>
                                </img>
                                <div className={styles.listItemText}>
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </main>
            <Footer />
        </>
    )
}

export default Items;