//https://pokeapi.co/api/v2/pokemon
import { formatPokemonName } from "../utils/utils"
import { PokemonDetails } from "../types/types"

export async function fetchPokemon(name: string): Promise<PokemonDetails> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${formatPokemonName(name)}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch pokemon")
    }

    const result = await response.json()

    const pokemon = {
        name: result.name,
        id: result.id,
        imgSrc: `https://img.pokemondb.net/sprites/black-white/anim/normal/${formatPokemonName(name)}.gif`,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        attackSp: result.stats[3].base_stat,
        defense: result.stats[2].base_stat,
        defenseSp: result.stats[4].base_stat,
        speed: result.stats[5].base_stat,

    }

    return pokemon
}