export type Pokemon = {
    name: string
    id: string
    imgSrc: string
}

export type PokemonDetails = {
    name: string
    id: string
    imgSrc: string
    hp: number
    attack: number
    attackSp: number
    defense: number
    defenseSp: number
    speed: number
}

export type Item = {
    name: string
    id: string
    imgSrc: string
}

export type ItemDetails = {
    name: string
    id: string
    cost: number
    desc: string
    imgSrc: string
}

export type Region = {
    id: number
    name: string
    value: string
}