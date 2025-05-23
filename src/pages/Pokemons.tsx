import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../api/fetchPokemons";
import { Pokemon } from "../types/types";
import styles from "./pokemons.module.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen"
import DropdownMenu from "../components/DropDownMenu";

const Pokemons = () => {

    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [listPokemons, setListPokemons] = useState<Pokemon[]>([])
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [generation, setGeneration] = useState("")
    const regions = [
        { value: 'KANTO' },
        { value: 'JOHTO' },
        { value: 'HOENN' },
        { value: 'SINNOH' },
        { value: 'TESSELIA' },
    ];

    useEffect(() => {
        const fetchAllPokemons = async () => {
            setIsLoading(true)
            const allPokemons = await fetchPokemons()
            setPokemons(allPokemons)
            setIsLoading(false)
            setGeneration("kanto")
        }
        fetchAllPokemons()
    }, [])

    useEffect(() => {
        const filterPokemons = () => {

            if (generation.match("KANTO")) {
                setListPokemons(pokemons?.slice(0, 151).filter((pokemon) => {
                    return pokemon.name.toLowerCase().match(query.toLowerCase())
                }))
            } else if (generation.match("JOHTO")) {
                setListPokemons(pokemons?.slice(152, 251).filter((pokemon) => {
                    return pokemon.name.toLowerCase().match(query.toLowerCase())
                }))
            } else if (generation.match("HOENN")) {
                setListPokemons(pokemons?.slice(252, 386).filter((pokemon) => {
                    return pokemon.name.toLowerCase().match(query.toLowerCase())
                }))
            } else if (generation.match("SINNOH")) {
                setListPokemons(pokemons?.slice(387, 494).filter((pokemon) => {
                    return pokemon.name.toLowerCase().match(query.toLowerCase())
                }))
            } else if (generation.match("TESSELIA")) {
                setListPokemons(pokemons?.slice(495, 649).filter((pokemon) => {
                    return pokemon.name.toLowerCase().match(query.toLowerCase())
                }))
            } else {
                setListPokemons(pokemons?.slice(0, 151).filter((pokemon) => {
                    return pokemon.name.toLowerCase().match(query.toLowerCase())
                }))
            }
        }
        filterPokemons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generation])

    const filteredPokemons = listPokemons?.filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase())
    })

    if (isLoading || !pokemons) {
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