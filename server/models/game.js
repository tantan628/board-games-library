export default class Game {
  constructor({ id, name, yearpublished, image, minage, minplayers, maxplayers, categories }) {
    this.id = id
    this.name = name
    this.yearpublished = yearpublished
    this.image = image
    this.minage = minage
    this.minplayers = minplayers
    this.maxplayers = maxplayers
    this.categories = categories
  }
}
