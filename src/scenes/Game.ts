import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  private grassLayer?: Phaser.Tilemaps.TilemapLayer
  private decoLayer?: Phaser.Tilemaps.TilemapLayer
  private fenceLayer?: Phaser.Tilemaps.TilemapLayer

  private player?: Phaser.Physics.Arcade.Sprite

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('game')
  }

  preload() {
    this.cursors = this.input.keyboard?.createCursorKeys()
  }

  create() {
    const map = this.make.tilemap({ key: 'home' })
    const tileset = map.addTilesetImage('overworld', 'overworld')!

    this.grassLayer = map.createLayer('gras', tileset) || undefined
    this.grassLayer?.setCollisionByProperty({ collides: true })
    this.decoLayer = map.createLayer('deco', tileset) || undefined
    this.fenceLayer = map.createLayer('fence', tileset) || undefined
    this.fenceLayer?.setCollisionByProperty({ collides: true })

    this.player = this.physics.add.sprite(256, 256, 'player', 'walk-down-1.png');
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.grassLayer!)
    this.physics.add.collider(this.player, this.fenceLayer!)
  }
    
  update() {
    if (!this.cursors || !this.player) {
      return
    }

    const speed = 200

    let action = 'walk'
    if (this.input?.keyboard?.keys[Phaser.Input.Keyboard.KeyCodes.SPACE]?.isDown) {
      action = 'attack'
    }

    if (this.input?.keyboard?.keys[Phaser.Input.Keyboard.KeyCodes.SHIFT]?.isDown) {
      action = 'carry'
      
      if (this.input?.keyboard?.keys[Phaser.Input.Keyboard.KeyCodes.SPACE]?.isDown) {
        action = 'grab'
      }
    }

    if (this.cursors.left?.isDown) {
      this.player.anims.play(`player-${action}-left`, true)
      this.player?.setVelocityX(-speed)
    } else if (this.cursors.right?.isDown) {
      this.player.anims.play(`player-${action}-right`, true)
      this.player?.setVelocityX(speed)
    } else {
      this.player?.setVelocityX(0)
    }


    if (this.cursors.up?.isDown) {
      this.player.anims.play(`player-${action}-up`, true)
      this.player?.setVelocityY(-speed)
    } else if (this.cursors.down?.isDown) {
      this.player.anims.play(`player-${action}-down`, true)
      this.player?.setVelocityY(speed)
    } else {
      this.player?.setVelocityY(0)
    }

    if (this.player.body?.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.anims.stop()
    }
  }
}