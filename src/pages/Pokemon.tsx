import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPokemon } from "../api/fetchPokemon";
import { Ability, PokemonDetails } from "../types/types";
import Footer from "../components/Footer";
import styles from "./pokemon.module.css"
import pokeball from "../assets/pokeball.png"
import LoadingScreen from "../components/LoadingScreen";

const Pokemon = () => {

    const { name } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [showContentA, setShowContentA] = useState(true);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()
    const [abilities, setAbilities] = useState<Ability[]>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            setIsLoading(true)
            const pokemon = await fetchPokemon(name as PokemonDetails["name"])
            setAbilities(pokemon.abilities)
            setPokemonDetails(pokemon)
            setIsLoading(false)
        }
        fetchPokemonInfo()
    }, [name])

    if (isLoading || !pokemonDetails) {
        return <LoadingScreen />
    }

    const toggleContent = () => {
        setShowContentA(!showContentA);
    };

    return (
        <>
            <div className={styles.headContainer}>
                <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
                    <img className={styles.pokeballImg} src={pokeball} alt="Pokeball" />
                    go Back
                </button>
            </div>
            {showContentA ? (
                <main className={`${styles.pokemon} ${showContentA ? styles.flipped : ''}`}>
                    <div className={styles.pokemonInfo}>
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={toggleContent}
                                className={styles.toggleButton}
                            >
                                {showContentA ? 'Abilities' : 'Pokemon Info'}
                            </button>
                        </div>
                        <div className={styles.pokemonTitle}>{name}</div>
                        <div className={styles.pokemonInfoImgContainer}>
                            <img className={styles.pokemonInfoImg} src={pokemonDetails?.imgSrc} alt={name} />
                        </div>
                        <div className={styles.pokemonDescriptionContainer}>
                            <div className={styles.pokemonDescription}>HP: {pokemonDetails?.hp}</div>
                            <div className={styles.pokemonDescription}>ATTACK: {pokemonDetails?.attack}</div>
                            <div className={styles.pokemonDescription}>ATTACK SP: {pokemonDetails?.attackSp}</div>
                            <div className={styles.pokemonDescription}>DEFENSE: {pokemonDetails?.defense}</div>
                            <div className={styles.pokemonDescription}>DEFENSE SP: {pokemonDetails?.defenseSp}</div>
                            <div className={styles.pokemonDescription}>SPEED: {pokemonDetails?.speed}</div>
                        </div>
                    </div>
                </main>
            ) : (
                <main className={styles.abilityBackside}>
                    <div className={styles.abilityInfoBackside}>
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={toggleContent}
                                className={styles.toggleButton}
                            >
                                {showContentA ? 'Abilities' : 'Pokemon Info'}
                            </button>
                        </div>
                        <nav className={styles.nav}>
                            {abilities?.map((ability) => {
                                return (
                                    <Link
                                        key={ability.id}
                                        className={styles.listAbility}
                                        to={`/abilities/${ability.name}`}
                                    >
                                        <div className={styles.abilityContainer}>
                                            <div className={styles.listAbilityText}>
                                                <span>{ability.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </main >
            )}
            <div className={styles.footer}>
            </div>
            <Footer />
        </>
    )
}

export default Pokemon;