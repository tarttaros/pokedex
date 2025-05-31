import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./abilities.module.css";
import LoadingScreen from "../components/LoadingScreen";
import { Ability } from "../types/types";
import { fetchAbilities } from "../api/fetchAbilities";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";

const Abilities = () => {
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [abilities, setAbilities] = useState<Ability[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const abilitiesPerPage = 60;

    useEffect(() => {
        loadItems(" ")
    }, [])

    const loadItems = async (url: string) => {
        setIsLoading(true);
        const uniqueItem = await fetchAbilities(url);
        setAbilities(uniqueItem)
        setIsLoading(false)
    }

    const filteredAbilities = abilities?.filter((item) => {
        return item.name.toLowerCase().match(query.toLowerCase())
    })

    const totalPages = Math.ceil(filteredAbilities.length / abilitiesPerPage)

    const paginatedData = filteredAbilities.slice((currentPage - 1) * abilitiesPerPage, currentPage * abilitiesPerPage);

    if (isLoading || !abilities) {
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
                    {paginatedData?.map((ability) => {
                        return (
                            <Link
                                key={ability.id}
                                className={styles.listAbility}
                                to={`/abilities/${ability.name}`}
                            >
                                <div className={styles.imageContainer}>
                                    <img
                                        className={styles.listAbilityIcon}
                                        src={ability.imgSrc}
                                        alt={ability.name}>
                                    </img>
                                </div>
                                <div className={styles.abilityContainer}>
                                    <div className={styles.listAbilityText}>
                                        <span>{ability.name}</span>
                                    </div>
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

export default Abilities;