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

export type Ability = {
    id: string
    name: string
    imgSrc: string
}

export type AbilityDetails = {
    id: string
    name: string
    desc: string
    type: any
    target: string
    typeDamage: string
    accuracy: string
    power: string
    pp: string
    priority: string
    ailment: string
    ailment_chance: string
    category: string
    crit_rate: string
    drain: string
    healing: string
    max_hits: string
    max_turns: string
    min_hits: string
    min_turns: string
}