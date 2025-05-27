import styles from "./header.module.css"
import pokeball from "../assets/pokeball.png"
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    query: string;
    setQuery: (query: string) => void
}

const Header = ({ query, setQuery }: HeaderProps) => {
    
    const navigate = useNavigate()
    return (
        <header className={styles.header}>
            <div className={styles.headContainer}>
                <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
                    <img className={styles.pokeballImg} src={pokeball} alt="Pokeball" />
                    go Back
                </button>
            </div>
            <input
                className={styles.input}
                placeholder="Search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </header>
    )
}

export default Header