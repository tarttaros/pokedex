import { formatItemName } from "../utils/utils"

export async function fetchItems(Url: string) {

    const response = await fetch("https://pokeapi.co/api/v2/item?offset=0&limit=954")

    if (!response.ok) {
        throw new Error("Failed to fetch pokemons")
    }

    const results = await response.json()

    const Items = results.results.map((item: any) => ({
        name: item.name,
        id: item.url.match(/\/(\d+)\/$/)[1],
        imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${formatItemName(item.name)}.png`,
    }))

    const uniqueItem = Items.filter(
        (item: any, index: number) =>
            Items.findIndex((other: any) => other.id === item.id) === index
    )

    return uniqueItem

}