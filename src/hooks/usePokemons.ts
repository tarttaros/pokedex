import { useState } from "react"
import { Pokemon } from "../types/types"
import { fetchPokemons } from "../api/fetchPokemons"

export function usePokemons() {

    const [listPokemons, setListPokemons] = useState<Pokemon[]>([])
    const [error, setError] = useState(null)

    const fetchAllPokemons = async (generation: string) => {

        if (!generation) return
        try {
            const allPokemons = await fetchPokemons()
            filterPokemons(allPokemons, generation)
        } catch (error: any) {
            setError(error.message)
        }

    }

    const filterPokemons = (allPokemons: Pokemon[], generation: string) => {

        if (generation.match("KANTO")) {
            setListPokemons(allPokemons?.slice(0, 151).filter((pokemon) => {
                return pokemon
            }))
        } else if (generation.match("JOHTO")) {
            setListPokemons(allPokemons?.slice(152, 251).filter((pokemon) => {
                return pokemon
            }))
        } else if (generation.match("HOENN")) {
            setListPokemons(allPokemons?.slice(252, 386).filter((pokemon) => {
                return pokemon
            }))
        } else if (generation.match("SINNOH")) {
            setListPokemons(allPokemons?.slice(387, 494).filter((pokemon) => {
                return pokemon
            }))
        } else if (generation.match("TESSELIA")) {
            setListPokemons(allPokemons?.slice(495, 649).filter((pokemon) => {
                return pokemon
            }))
        } else {
            setListPokemons(allPokemons?.slice(0, 151).filter((pokemon) => {
                return pokemon
            }))
        }
    }
    return { listPokemons, fetchAllPokemons, error }
}