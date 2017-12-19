module.exports = function (game) {
    this.game = game;

    this.fireRate = 600;
    this.size = 7;
    this.remainingBullets = this.size;
    this.reloadTime = 1100;
    this.nextFire = 0;

    // Bullets
    this.bullets = game.add.group();
    this.bullets.createMultiple(50, 'bullet');
    game.physics.enable(this.bullets, Phaser.Physics.ARCADE);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('body.velocity.x', -600);

    this.capsuleEmitter = this.game.add.emitter(0, 0, 200);
    this.capsuleEmitter.makeParticles('capsule');
    this.capsuleEmitter.minParticleSpeed.setTo(-100, -100);
    this.capsuleEmitter.maxParticleSpeed.setTo(200, 200);

    this.magazineEmitter = this.game.add.emitter(0, 0, 200);
    this.magazineEmitter.makeParticles('magazine');
    this.magazineEmitter.minParticleSpeed.setTo(-100, -100);
    this.magazineEmitter.maxParticleSpeed.setTo(200, 200);

    // Sounds
    this.shootSound = game.add.audio('shootSound', 0.5);
    this.reloadSound = game.add.audio('reloadSound', 0.5);

    // Presentation bullets
    this.magBullets = game.add.group();
    for(var i=0; i<this.size; i++) {
        var bullet = this.magBullets.create(600+(20*i), 20, 'bullet2');
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
    }
}