import { useState } from "react";
import styles from "./dropDownMenu.module.css";

interface DropdownMenuProps {
    options: { value: string }[];
    onSelect: (selectedValue: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("KANTO");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        onSelect(item)
        toggleMenu()
    };

    return (
        <div className={`${styles.container} ${isOpen ? styles.active : ''}`} >
            <button className={styles.button} onClick={toggleMenu}>{selectedItem}</button>
            <ul className={styles.list}>
                {options.map((option) => (
                    <li className={styles.item} key={option.value} onClick={() => handleSelect(option.value)}>
                        {option.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownMenu;
