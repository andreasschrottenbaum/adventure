import './style.css'

import Phaser from 'phaser'

import config from './config'
import Preload from './scenes/Preload'
import Game from './scenes/Game'

new Phaser.Game({ ...config, scene: [Preload, Game] })