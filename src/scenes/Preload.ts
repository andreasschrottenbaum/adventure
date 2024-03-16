import Phaser from 'phaser'

export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('overworld', 'assets/gfx/overworld.png')
    this.load.tilemapTiledJSON('home', 'assets/map1.json')

    this.load.atlas('player', 'assets/gfx/character/character.png', 'assets/gfx/character/character.json')
  }

  create() { 
    const actions = ['walk', 'carry', 'attack']
    const directions = ['up', 'down', 'left', 'right']

    // create animations for walking, carrying, and attacking in all directions
    actions.forEach((action) => {
      directions.forEach((dir) => {
        this.anims.create({
          key: `player-${action}-${dir}`,
          frames: this.anims.generateFrameNames('player', { start: 1, end: 4, prefix: `${action}-${dir}-`, suffix: '.png' }),
          repeat: -1,
          frameRate: 8
        })
      })
    })
    
    // create animations for grabbing in all directions
    directions.forEach((dir) => {
      this.anims.create({
        key: `player-grab-${dir}`,
        frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: `grab-${dir}-`, suffix: '.png' }),
        repeat: -1,
        frameRate: 8
      })
    })

    this.scene.start('game')
  }
  
  update() {}
}