import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAbility } from "../api/fetchAbility";
import { AbilityDetails } from "../types/types";
import Footer from "../components/Footer";
import styles from "./ability.module.css"
import pokeball from "../assets/pokeball.png"
import LoadingScreen from "../components/LoadingScreen";

const Ability = () => {

    const { name } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [abilityDetails, setAbilityDetails] = useState<AbilityDetails>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAbilityInfo = async () => {
            setIsLoading(true)
            const ability = await fetchAbility(name as AbilityDetails["name"])
            setAbilityDetails(ability)
            setIsLoading(false)
        }
        fetchAbilityInfo()
    }, [name])

    if (isLoading || !abilityDetails) {
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
            <main className={styles.ability}>
                <div className={styles.abilityInfo}>
                    <div className={styles.abilityTitle}>{abilityDetails?.name}</div>
                    <div className={styles.abilityDescription}>{abilityDetails?.desc}</div>
                    <img className={styles.abilityInfoImg} src={abilityDetails?.type} alt={name} />
                    <div className={styles.alignDescriptionCharacteristics}>
                        <div className={styles.subAlignDescriptionCharacteristics}>
                            <div className={styles.abilityDescriptionCharacteristics}>Target: {abilityDetails?.target}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Damage Type: {abilityDetails?.typeDamage}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Accuracy: {abilityDetails?.accuracy}%</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Power: {abilityDetails?.power}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>PP: {abilityDetails?.pp}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Priority: {abilityDetails?.priority}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Ailment: {abilityDetails?.ailment}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Ailment Chance: {abilityDetails?.ailment_chance}%</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Category: {abilityDetails?.category}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Crit.Rate: {abilityDetails?.crit_rate}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Drain: {abilityDetails?.drain}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Healing: {abilityDetails?.healing}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Min. Hits: {abilityDetails?.min_hits}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Max. Hits: {abilityDetails?.max_hits}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Min. Turns: {abilityDetails?.min_turns}</div>
                            <div className={styles.abilityDescriptionCharacteristics}>Max. Turns: {abilityDetails?.max_turns}</div>
                        </div>
                    </div>
                </div>
            </main>
            <div className={styles.footer}>
            </div>
            <Footer />
        </>
    )
}

export default Ability;