import { formatItemName } from "../utils/utils"
import { ItemDetails } from "../types/types"

interface caracteristics {
    language: {
        name: string
    }
    text: string
}

interface itemDetails {
    name: string
    id: string
    cost: number
    flavor_text_entries: caracteristics[]
}

export async function fetchItem(name: ItemDetails["name"]): Promise<ItemDetails> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/item/${formatItemName(name)}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch pokemon")
    }

    const result: itemDetails = await response.json()

    for (const caracteristic of result.flavor_text_entries) {

        if (caracteristic.language.name.match("en")) {

            let text = caracteristic.text
            
            const item = {
                name: result.name,
                id: result.id,
                desc: text,
                cost: result.cost,
                imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${formatItemName(name)}.png`,
            }

            return item
        }
    }

    const item = {
        name: result.name,
        id: result.id,
        desc: "N/A",
        cost: result.cost,
        imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${formatItemName(name)}.png`,
    }

    return item

}