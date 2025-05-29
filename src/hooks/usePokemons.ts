import { useState } from "react"
import { Pokemon } from "../types/types"
import { fetchPokemons } from "../api/fetchPokemons"

export function usePokemons() {

    const [listPokemons, setListPokemons] = useState<Pokemon[]>([])
    const [error, setError] = useState(null)

    const fetchAllPokemons = async (generation: string) => {

        if (!generation) return
        try {
            if (generation.match("kanto")) {
                setListPokemons(await fetchPokemons(0, 151))
            } else if (generation.match("johto")) {
                setListPokemons(await fetchPokemons(152, 251))
            } else if (generation.match("hoenn")) {
                setListPokemons(await fetchPokemons(252, 386))
            } else if (generation.match("sinnoh")) {
                setListPokemons(await fetchPokemons(387, 494))
            } else if (generation.match("unova")) {
                setListPokemons(await fetchPokemons(495, 649))
            }else {
                setListPokemons(await fetchPokemons(0, 151))
            }
        } catch (error: any) {
            setError(error.message)
        }
    }
    return { listPokemons, fetchAllPokemons, error }
}