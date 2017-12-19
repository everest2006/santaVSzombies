var zombiegame = {};

zombiegame.Boot = function (game) {

};

zombiegame.Boot.prototype = require('./Boot.js');

zombiegame.Preload = function (game) {

};

zombiegame.Preload.prototype = require('./Preloader.js');


zombiegame.Menu = function (game) {

};

zombiegame.Menu.prototype = require('./MainMenu.js');

zombiegame.rungame = function (game) {
    this.zombies = null;
    this.player = null;
    this.gamespeed = null;
    this.zombieKillSound = null;
    this.buttonLock = null;
};
zombiegame.rungame.prototype = require('./Rungame.js');


zombiegame.Player = require('../Player.js');

zombiegame.Player.prototype.jump = function() {
    if(this.sprite.body.touching.down) {
        this.sprite.body.velocity.y = -this.jumpStrange;
    }
}

zombiegame.Player.prototype.releaseJump = function() {
    if(this.sprite.body.velocity.y < 0) {
        this.sprite.body.velocity.y = 0;
    }
}

zombiegame.Player.prototype.shoot = function() {
    this.weapon.onShoot(this.sprite);
}

zombiegame.Player.prototype.update = function() {
    this.weapon.update();

    if(!this.sprite.body.touching.down) {
        this.sprite.animations.play('jump');
    }
}

zombiegame.Player.prototype.die = function() {
    this.isDead = true;
    this.sprite.kill();
    zombiegame.rungame.bloodEmitter.at(this.sprite);
    zombiegame.rungame.bloodEmitter.start(true, 2000, null, 50);
    this.sprite.visible = false;
    this.deadSound.play();
}





zombiegame.Weapon  = require('../Weapon.js');


zombiegame.Weapon.prototype.onHit = function(bullet, object) {
    bullet.kill();
}

zombiegame.Weapon.prototype.update = function() {

    if(this.game.time.now > this.nextFire && this.remainingBullets === 0) {
        this.remainingBullets = this.size;
        this.magBullets.setAll('body.y', 20);
        this.magBullets.setAll('body.velocity.y', 0);
    }
}

zombiegame.Weapon.prototype.onShoot = function(playersprite) {

    // check for next shoot:
    // time to next shoot is over and bullet sprites available
    if(this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        // if the magazine is not empty
        if(this.remainingBullets > 0) {
            // set up the next earliest moment to shoot
            this.nextFire = this.game.time.now + this.fireRate;

            // get the next possible bullet sprite
            var bullet = this.bullets.getFirstDead();

            // set up to player sprite
            bullet.reset(playersprite.body.x + 12, playersprite.body.y + 12);
            bullet.body.velocity.x = 800;

            // decrease the shoot from magazine
            this.remainingBullets--;

            // play shoot sound
            this.shootSound.play();

            playersprite.animations.play('shooting');

            // show bullet capsule
            this.capsuleEmitter.x = playersprite.x + 30;
            this.capsuleEmitter.y = playersprite.y;
            this.capsuleEmitter.start(true, 2000, null, 1);

            // Update show bullets
            var magBullet = this.magBullets.getAt(this.size-this.remainingBullets-1);
            magBullet.body.velocity.y = -1000;

            // magazine is empty
            if(this.remainingBullets == 0) {
                this.nextFire = this.game.time.now + this.reloadTime;
                playersprite.animations.play('reload');
                playersprite.animations.currentAnim.onComplete.add(function() {
                    playersprite.animations.play('right');
                });
                this.reloadSound.play();
                this.magazineEmitter.x = playersprite.x + 30;
                this.magazineEmitter.y = playersprite.y;
                this.magazineEmitter.start(true, 2000, null, 1);
            }
        }
    }
}

zombiegame.Highscore = require('../Highscore.js');
zombiegame.world = require('../World.js');

module.exports = zombiegame;
