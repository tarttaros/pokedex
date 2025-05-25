import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchItem } from "../api/fetchItem";
import { ItemDetails } from "../types/types";
import Footer from "../components/Footer";
import styles from "./item.module.css"
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
            setIsLoading(false)
        }
        fetchItemInfo()
    }, [name])

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
            <div className={styles.item}>
                <main className={styles.itemInfo}>
                    <div className={styles.itemTitle}>{name}</div>
                    <div className={styles.itemInfoImgContainer}>
                        <img className={styles.itemInfoImg} src={itemDetails?.imgSrc} alt={name} />
                    </div>
                    <div className={styles.itemDescription}>{itemDetails?.desc}</div>
                    <div className={styles.itemCost}>Costo: {itemDetails?.cost}</div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Item;