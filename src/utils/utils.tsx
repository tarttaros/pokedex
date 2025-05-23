export function formatPokemonName(name: string): string {
    if (name.includes("♀")) {
        return name.replace("♀", "-f").toLowerCase()
    } else if (name.includes("♂")) {
        return name.replace("♂", "-m").toLowerCase()
    } else if (name.includes(". ")) {
        return name.replace(". ", "-").toLowerCase()
    } else if (name.includes("Farfetch'd")) {
        return name.replace("Farfetch'd", "farfetchd")
    } else if (name.includes("Mime Jr.")) {
        return name.replace("Mime Jr.", "mime-jr")
    } else return name.toLowerCase()
}

export function formatItemName(name: string): string {
    if (name.includes(" ")) {
        return name.replace(" ", "-").toLowerCase()
    } else if (name.includes("watmel-berry")) {
        return name = ("watmel-berry")
    } else if (name.includes("hm08")) {
        return name = ("hm-normal")
    } else if (name.includes("tm")) {
        return name = ("tm-normal")
    } else if (name.includes("xtransceiver--red")) {
        return name = ("data-card-22")
    } else if (name.includes("xtransceiver--yellow")) {
        return name = ("data-card-22")
    } else return name.toLowerCase()
}