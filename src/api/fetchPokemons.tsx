// https://unpkg.com/pokemons@1.1.0/pokemons.json
//   0, 151 kanto
// 152, 251 johto
// 252, 386 Hoenn
// 387, 494 sinnoh
// 495, 649 teselia

import { formatPokemonName } from "../utils/utils"
import { Pokemon } from "../types/types"

export async function fetchPokemons(): Promise<Pokemon[]> {
    const response = await fetch(
        "https://unpkg.com/pokemons@1.1.0/pokemons.json"
    )

    if (!response.ok) {
        throw new Error("Failed to fetch pokemons")
    }

    const results = await response.json()

    const pokemons = results.results.map((pokemon: any) => ({
        name: pokemon.name,
        id: pokemon.national_number,
        imgSrc: `https://img.pokemondb.net/sprites/black-white/anim/normal/${formatPokemonName(pokemon.name)}.gif`,
    }))

    const uniquePokemon = pokemons.filter(
        (pokemon: any, index: number) =>
            pokemons.findIndex((other: any) => other.id === pokemon.id) === index
    )

    return uniquePokemon
}