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
    const actions: [animationName: string, frameCount: number][] = [['walk', 4], ['carry', 4], ['attack', 4], ['grab', 3]]
    const directions = ['up', 'down', 'left', 'right']

    actions.forEach(([animationName, frameCount]) => {
      directions.forEach((direction) => {
        this.anims.create({
          key: `player-${animationName}-${direction}`,
          frames: this.anims.generateFrameNames('player', { start: 1, end: frameCount, prefix: `${animationName}-${direction}-`, suffix: '.png' }),
          repeat: -1,
          frameRate: 8
        })
      })
    })

    this.scene.start('game')
  }
  
  update() {}
}