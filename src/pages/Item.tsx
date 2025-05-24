import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchItem } from "../api/fetchItem";
import { ItemDetails } from "../types/types";
import Footer from "../components/Footer";
import styles from "./pokemon.module.css"
import pokeball from "../assets/pokeball.png"
import LoadingScreen from "../components/LoadingScreen";

const Item = () => {

    const { name } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [itemDetails, setItemDetails] = useState<ItemDetails>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItemInfo = async () => {
            setIsLoading(true)
            const item = await fetchItem(name as ItemDetails["name"])
            setItemDetails(item)
            console.log(itemDetails)
            setIsLoading(false)
        }
        fetchItemInfo()
    }, [itemDetails,name])

    if (isLoading || !itemDetails) {
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
                        <img className={styles.pokemonInfoImg} src={itemDetails?.imgSrc} alt={name} />
                    </div>
                    <div>{itemDetails?.desc}</div>
                    <div>Costo: {itemDetails?.cost}</div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Item;