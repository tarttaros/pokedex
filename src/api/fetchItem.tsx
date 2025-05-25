import { formatItemName } from "../utils/utils"
import { ItemDetails } from "../types/types"

export async function fetchItem(name : ItemDetails["name"]): Promise<ItemDetails> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/item/${formatItemName(name)}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch pokemon")
    }

    const result = await response.json()

    const item = {
        name: result.name,
        id: result.id,
        desc: result.flavor_text_entries[0].text,
        cost: result.cost,
        imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${formatItemName(name)}.png`,
    }

    return item
}