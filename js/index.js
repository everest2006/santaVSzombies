//require('../node_modules/phaser/build/pixi.js');
//require('../node_modules/phaser/build/phaser.js');
//require('../node_modules/phaser/build/p2.js');

require('pixi');
require('p2');
require('phaser');
var zombiegame = require('./states/Zombiegame.js');
window.zombiegame = zombiegame;
//var game = new phaser.Game(800, 600, Phaser.AUTO, 'game');
zombiegame.game = new Phaser.Game(800,400,Phaser.AUTO,'game', true, false);
    //{preload:preload, create:create, update:update, render:render});

zombiegame.game.state.add("Boot",zombiegame.Boot);
console.log("boot");
zombiegame.game.state.add("Preload",zombiegame.Preload);
console.log("preload");
zombiegame.game.state.add("Menu",zombiegame.Menu);
console.log("MainMenu");
zombiegame.game.state.add("Game",zombiegame.rungame);
console.log("Rungane");

zombiegame.game.model = {

    /* Saves the scores and does logic handling */
    score: new zombiegame.Highscore(),

    /* Speed for the cloud movement */
    cloudspeed: 10,

    /* Speed for the house-rotation */
    gamespeed: 130,

    /* Time in milliseconds to spawn the next zombie */
    spawntime: 1200,

    /* Handle for the background music */
    music: null,
    isMusicEnabled: true,
};

zombiegame.game.state.start('Boot');


//function preload() {
//    game.load.image('graund','sprit/christmas_frame.jpg');
//}
//function create() {
//    game.add.sprite(0,0,'graund');
//}
//function update() {
    
//}
//function render() {
    
//}