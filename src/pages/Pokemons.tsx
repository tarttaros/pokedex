import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./pokemons.module.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen"
import { usePokemons } from "../hooks/usePokemons";
import { Region } from "../types/types";

const Pokemons = () => {

    const { generation } = useParams()
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { listPokemons, fetchAllPokemons, error } = usePokemons()

    useEffect(() => {
        setIsLoading(true)
        fetchAllPokemons(generation as Region["value"])
        setIsLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredPokemons = listPokemons?.filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase())
    })

    if (isLoading || !listPokemons) {
        return <LoadingScreen />
    }

    return (
        <>
            <Header query={query} setQuery={setQuery} />
            <main className={styles.main}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <nav className={styles.nav}>
                    {filteredPokemons?.map((pokemon) => {
                        return (
                            <Link
                                key={pokemon.id}
                                className={styles.listItem}
                                to={`/generations/${generation}/${pokemon.name}`}
                            >
                                <div className={styles.imageContainer}>
                                    <img
                                        className={styles.listItemsIcon}
                                        src={pokemon.imgSrc}
                                        alt={pokemon.name}>
                                    </img>
                                </div>
                                <div className={styles.listItemText}>
                                    <span>{pokemon.name}</span>
                                    <span>N. Pokedex: {pokemon.id}</span>
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

export default Pokemons;