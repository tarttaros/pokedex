import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import styles from "./pokemon.module.css"
import pokeball from "../assets/pokeball.png"
import { fetchPokemon } from "../api/fetchPokemon";
import { PokemonDetails } from "../types/types";
import LoadingScreen from "../components/LoadingScreen";

const Pokemon = () => {

    const { name } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()
    const navigate = useNavigate()

    useEffect(() => {
        fetchPokemonInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPokemonInfo = async () => {
        setIsLoading(true)
        const pokemon = await fetchPokemon(name as string)
        setPokemonDetails(pokemon)
        setIsLoading(false)
    }

    if (isLoading || !pokemonDetails) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className={styles.headContainer}>
                <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
                    <img className={styles.pokeballImg} src={pokeball} alt="Pokeball" />
                    go Back
                </button>
            </div>
            <div className={styles.pokemon}>
                <main className={styles.pokemonInfo}>
                    <div className={styles.pokemonTitle}>{name}</div>
                    <div>
                        <img className={styles.pokemonInfoImg} src={pokemonDetails?.imgSrc} alt={name} />
                    </div>
                    <div>HP: {pokemonDetails?.hp}</div>
                    <div>ATTACK: {pokemonDetails?.attack}</div>
                    <div>ATTACK SP: {pokemonDetails?.attackSp}</div>
                    <div>DEFENSE: {pokemonDetails?.defense}</div>
                    <div>DEFENSE SP: {pokemonDetails?.defenseSp}</div>
                    <div>SPEED: {pokemonDetails?.speed}</div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Pokemon;