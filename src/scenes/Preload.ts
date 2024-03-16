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

    // create animations for walking, carrying, and attacking in all directions
    actions.forEach(([animationName, frameCount]) => {
      directions.forEach((dir) => {
        this.anims.create({
          key: `player-${animationName}-${dir}`,
          frames: this.anims.generateFrameNames('player', { start: 1, end: frameCount, prefix: `${animationName}-${dir}-`, suffix: '.png' }),
          repeat: -1,
          frameRate: 8
        })
      })
    })

    this.scene.start('game')
  }
  
  update() {}
}