import { Link } from "react-router-dom";
import styles from "./regions.module.css"
import Footer from "../components/Footer";

const Regions = () => {

    const regions = [
        { id: 0, name: 'KANTO', value: 'kanto' },
        { id: 1, name: 'JOHTO', value: 'johto' },
        { id: 2, name: 'HOENN', value: 'hoenn' },
        { id: 3, name: 'SINNOH', value: 'sinnoh' },
        { id: 4, name: 'UNOVA', value: 'unova' },
    ];

    return (
        <>
            <div className={styles.header}>
                PokeWiki
            </div>
            <main className={styles.menu}>
                <nav className={styles.menuInfo}>
                    {regions?.map((region) => {
                        return (
                            <Link
                                key={region.id}
                                className={styles.menuInfoButtonContainer}
                                to={`/regions/${region.value as string}`}
                            >
                                <div className={styles.menuInfoButton}>
                                    <span className={styles.buttonText}>{region.name.toString()}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </main>
            <div className={styles.footer}></div>
            <Footer />
        </>
    )
}

export default Regions;