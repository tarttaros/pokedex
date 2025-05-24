import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pokemons.module.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen"
import DropdownMenu from "../components/DropDownMenu";
import { usePokemons } from "../hooks/usePokemons";

const Pokemons = () => {

    const [query, setQuery] = useState("")
    const [generation, setGeneration] = useState("KANTO")
    const [isLoading, setIsLoading] = useState(false)
    const { listPokemons, fetchAllPokemons, error } = usePokemons()
    const regions = [
        { value: 'KANTO' },
        { value: 'JOHTO' },
        { value: 'HOENN' },
        { value: 'SINNOH' },
        { value: 'TESSELIA' },
    ];

    useEffect(() => {
        setIsLoading(true)
        fetchAllPokemons(generation)
        setIsLoading(false)
        
    }, [fetchAllPokemons,generation])

    const filteredPokemons = listPokemons?.filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase())
    })

    if (isLoading || !listPokemons) {
        return <LoadingScreen />
    }

    const handleSelect = (generation: string) => {
        setGeneration(generation)
    };

    return (
        <>
            <Header query={query} setQuery={setQuery} />
            <main className={styles.main}>
                <DropdownMenu
                    options={regions}
                    onSelect={handleSelect}
                />
                {error && <p style={{color:'red'}}>{error}</p>}
                <nav className={styles.nav}>
                    {filteredPokemons?.map((pokemon) => {
                        return (
                            <Link
                                key={pokemon.id}
                                className={styles.listItem}
                                to={`/pokemons/${pokemon.name}`}
                            >
                                <img
                                    className={styles.listItemsIcon}
                                    src={pokemon.imgSrc}
                                    alt={pokemon.name}>
                                </img>
                                <div className={styles.listItemText}>
                                    <span>{pokemon.name}</span>
                                    <span>{pokemon.id}</span>
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