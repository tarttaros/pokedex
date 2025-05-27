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
                to="/pokemons"
            >
                <img className={styles.footerIcon} src={PokemonPic} alt="Pokemon" />
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
                onClick={(event) => event.preventDefault()}
                className={styles.footerLink}
                to="/location"
            >
                <img className={styles.footerIcon} src={LocationPic} alt="Location" />
                Location
            </Link>
        </footer>
    )
}

export default Footer