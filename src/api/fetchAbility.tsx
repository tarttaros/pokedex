import { formatAbilityName } from "../utils/utils"
import { AbilityDetails } from "../types/types"
import normal from "../assets/damageTypes/normal.png"
import fighting from "../assets/damageTypes/fighting.png"
import flying from "../assets/damageTypes/flying.png"
import poison from "../assets/damageTypes/poison.png"
import ground from "../assets/damageTypes/ground.png"
import rock from "../assets/damageTypes/rock.png"
import bug from "../assets/damageTypes/bug.png"
import ghost from "../assets/damageTypes/ghost.png"
import steel from "../assets/damageTypes/steel.png"
import fire from "../assets/damageTypes/fire.png"
import water from "../assets/damageTypes/water.png"
import grass from "../assets/damageTypes/grass.png"
import electric from "../assets/damageTypes/electric.png"
import psychic from "../assets/damageTypes/psychic.png"
import ice from "../assets/damageTypes/ice.png"
import dragon from "../assets/damageTypes/dragon.png"
import dark from "../assets/damageTypes/dark.png"
import fairy from "../assets/damageTypes/fairy.png"
import stellar from "../assets/damageTypes/stellar.png"
import unknown from "../assets/damageTypes/unknown.png"

/* version group name = lets-go-pikachu-lets-go-eevee */
/* language = en */

interface description {
    flavor_text: string
    language: {
        name: string
    }
    version_group: {
        name: string
    }
}

interface effect {
    effect: string
}

interface names {
    language: {
        name: string
    }
    name: string
}

interface abilityDetails {
    id: string
    name: string
    names: names[]
    flavor_text_entries: description[]
    type: {
        name: string
    }
    effect_entries: effect[]
    target: {
        name: string
    }
    damage_class: {
        name: string
    }
    accuracy: string
    power: string
    pp: string
    priority: string
    meta: {
        ailment: {
            name: string
        }
        ailment_chance: string
        category: {
            name: string
        }
        crit_rate: string
        drain: string
        flint_chance: string
        healing: string
        max_hits: string
        max_turns: string
        min_hits: string
        min_turns: string
        stat_chance: string
    }
}

export async function fetchAbility(name: AbilityDetails["name"]): Promise<AbilityDetails> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/move/${formatAbilityName(name)}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch pokemon")
    }

    const result: abilityDetails = await response.json()

    console.log(result)

    let maxHits: string
    let minHits: string
    let maxTurns: string
    let minTurns: string
    let typeDamage: string
    let ailment: string
    let ailmentChance: string
    let ailmentCategory: string
    let crit_rate: string
    let drain: string
    let healing: string
    let priority: string
    let moveName: string = ''
    let accuracy: string

    for (const moveN of result.names) {
        if (moveN.language.name.match("en")) {
            moveName = moveN.name
        }
    }

    if (result.meta === null) {

        ailment = "none"
        ailmentChance = "0"
        ailmentCategory = "none"
        maxHits = "0"
        minHits = "0"
        maxTurns = "0"
        minTurns = "0"
        typeDamage = "0"
        crit_rate = "No"
        drain = "0"
        healing = "0"

    } else {
        if (!result.meta.ailment.name.match("none") && result.meta.ailment_chance === "0") {
            ailmentChance = "100"
        } else {
            ailmentChance = result.meta.ailment_chance
        }

        if (result.meta.min_hits) {
            maxHits = result.meta.max_hits
            minHits = result.meta.min_hits
        } else {
            maxHits = "0"
            minHits = "0"
        }
        if (result.meta.min_turns) {
            maxTurns = result.meta.max_turns
            minTurns = result.meta.min_turns
        } else {
            maxTurns = "0"
            minTurns = "0"
        }

        if (parseInt(result.meta.crit_rate) === 1) {
            crit_rate = "Yes"
        } else {
            crit_rate = "No"
        }

        ailment = result.meta.ailment.name
        ailmentCategory = result.meta.category.name
        drain = result.meta.drain
        healing = result.meta.drain
    }

    if (result.type.name.match("normal")) {
        typeDamage = normal
    } else if (result.type.name.match("fighting")) {
        typeDamage = fighting
    } else if (result.type.name.match("flying")) {
        typeDamage = flying
    } else if (result.type.name.match("poison")) {
        typeDamage = poison
    } else if (result.type.name.match("ground")) {
        typeDamage = ground
    } else if (result.type.name.match("rock")) {
        typeDamage = rock
    } else if (result.type.name.match("bug")) {
        typeDamage = bug
    } else if (result.type.name.match("ghost")) {
        typeDamage = ghost
    } else if (result.type.name.match("steel")) {
        typeDamage = steel
    } else if (result.type.name.match("fire")) {
        typeDamage = fire
    } else if (result.type.name.match("water")) {
        typeDamage = water
    } else if (result.type.name.match("grass")) {
        typeDamage = grass
    } else if (result.type.name.match("electric")) {
        typeDamage = electric
    } else if (result.type.name.match("psychic")) {
        typeDamage = psychic
    } else if (result.type.name.match("ice")) {
        typeDamage = ice
    } else if (result.type.name.match("dragon")) {
        typeDamage = dragon
    } else if (result.type.name.match("dark")) {
        typeDamage = dark
    } else if (result.type.name.match("fairy")) {
        typeDamage = fairy
    } else if (result.type.name.match("stellar")) {
        typeDamage = stellar
    } else {
        typeDamage = unknown
    }

    if (result.priority) {
        if (result.priority === "0") {
            priority = "No"
        } else {
            priority = "Yes"
        }
    } else {
        priority = "No"
    }

    if (result.accuracy) {
        accuracy = result.accuracy 
    } else {
        accuracy = "100"
    }


    for (const description of result.flavor_text_entries) {

        if (description.language.name.match("en") && description.version_group.name.match("lets-go-pikachu-lets-go-eevee")) {

            let text = description.flavor_text

            const ability = {
                id: result.id,
                name: moveName,
                desc: text,
                type: typeDamage,
                target: result.target.name,
                typeDamage: result.damage_class.name,
                accuracy: accuracy,
                power: result.power,
                pp: result.pp,
                priority: priority,
                ailment: ailment,
                ailment_chance: ailmentChance,
                category: ailmentCategory,
                crit_rate: crit_rate,
                drain: drain,
                healing: healing,
                max_hits: maxHits,
                max_turns: maxTurns,
                min_hits: minHits,
                min_turns: minTurns,
            }
            return ability
        }
    }
    const ability = {
        id: result.id,
        name: moveName,
        desc: "N/A",
        type: typeDamage,
        target: result.target.name,
        typeDamage: result.damage_class.name,
        accuracy: accuracy,
        power: result.power,
        pp: result.pp,
        priority: priority,
        ailment: ailment,
        ailment_chance: ailmentChance,
        category: ailmentCategory,
        crit_rate: crit_rate,
        drain: drain,
        healing: healing,
        max_hits: maxHits,
        max_turns: maxTurns,
        min_hits: minHits,
        min_turns: minTurns,
    }
    return ability
}
