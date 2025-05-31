export async function fetchAbilities(Url: string) {

    const response = await fetch("https://pokeapi.co/api/v2/move?offset=0&limit=937")

    if (!response.ok) {
        throw new Error("Failed to fetch pokemons")
    }

    const results = await response.json()

    const Abilities = results.results.map((ability: any) => ({
        name: ability.name,
        id: ability.url.match(/\/(\d+)\/$/)[1],
        imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hm-normal.png`,
    }))

    const uniqueAbility = Abilities.filter(
        (ability: any, index: number) =>
            Abilities.findIndex((other: any) => other.id === ability.id) === index
    )

    return uniqueAbility

}