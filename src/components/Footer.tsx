import { Link } from "react-router-dom";
import styles from "./footer.module.css"
import PokemonPic from "../assets/pikachu.png"
import ItemsPic from "../assets/pointer.png"
import LocationPic from "../assets/pokeball.svg"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link
                className={styles.footerLink}
                to="/"
            >
                <img className={styles.footerIcon} src={PokemonPic} alt="Pokemons" />
                Pokemons
            </Link>
            <Link
                className={styles.footerLink}
                to="/items"
            >
                <img className={styles.footerIcon} src={ItemsPic} alt="Items" />
                Items
            </Link>
            <Link
                className={styles.footerLink}
                to="/abilities"
            >
                <img className={styles.footerIcon} src={LocationPic} alt="Abilities" />
                Abilities
            </Link>
        </footer>
    )
}

export default Footer