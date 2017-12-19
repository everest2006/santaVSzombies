module.exports = function (game) {
    this.game = game;

    this.isDead = false;

    this.sprite = game.add.sprite(32, 100, 'player');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.gravity.y = 500;
    this.jumpStrange = 300;

    // set up frames for animation
    this.shootAnimation = this.sprite.animations.add(
        'shooting', [7, 8, 9, 10], 15, false);
    this.runAnimation = this.sprite.animations.add(
        'right', [0, 1, 2, 3, 4, 5, 6], 20, true);

    this.jumpAnimation = this.sprite.animations.add(
        'jump', [11, 12, 13, 14], 20, false);

    this.reloadAnimation = this.sprite.animations.add(
        'reload', [0, 1, 2, 3, 4, 5, 6], 15, false);

    this.sprite.animations.play('right');

    this.jumpAnimation.onComplete.add(function(sprite) {
        if(sprite.body.touching.down) {
            sprite.animations.play('right');
        } else {
            sprite.animations.play('jump');
        }
    });

    this.shootAnimation.onComplete.add(function(sprite) {
        sprite.animations.play('right');
    });

    this.weapon = new zombiegame.Weapon(game);

    this.deadSound = this.game.add.audio('deadSound', 0.8);
}

