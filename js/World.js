module.exports = {
    /** Create the plain background */
    drawBackground: function() {
        this.bg = zombiegame.game.add.group();
        this.bg.img = zombiegame.game.cache.getImage('bg');
        // create background with width of the screen
        for(var i = 0; i < zombiegame.game.width; i += this.bg.img.width) {
            this.bg.create(i, 0, 'bg');
        }
    },

    createZombiePool: function(poolsize) {
        var zombies = zombiegame.game.add.group();
        zombiegame.game.physics.enable(zombies, Phaser.Physics.ARCADE);
        zombies.createMultiple(poolsize, 'zombie');
        zombies.setAll('outOfBoundsKill', true);
        return zombies;
    },
    getRandomInt: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    spawnZombie: function(zombiePool, x, y, runSpeed) {

        var zombie = zombiePool.getFirstDead();

        if(zombie == null) return;

        zombiegame.game.physics.enable(zombie, Phaser.Physics.ARCADE);
        zombie.reset(x, y);

        // set up frames for animation
        zombie.animations.add('right', [0, 1, 2, 3, 4, 5], 5, true);

        zombie.animations.play('right');



        var direction = this.getRandomInt(-10, 10);
        zombie.body.velocity.x = -runSpeed + direction;
        zombie.body.collideWorldBounds = false;
        zombie.body.gravity.y = 500;

        if(zombie.body.velocity.x < -runSpeed) {
            // Set Anchor to the center of your sprite
            zombie.anchor.setTo(.5, .5);

            // Invert scale.x to flip left/right
            zombie.scale.x *= -1;
        }

        return zombie;
    },

    createClouds: function() {
        this.clouds = zombiegame.game.add.group();

        var positions = [
            [-300, 20],
            [10, 50],
            [350, 80],
            [600, 40]
        ];

        for(var i = 0; i < positions.length; i++) {
            var pos = positions[i];
            var cloud = this.clouds.create(pos[0], pos[1], 'cloud');
            zombiegame.game.physics.enable(cloud, Phaser.Physics.ARCADE);
            cloud.body.velocity.x = -zombiegame.game.model.cloudspeed;
        }

        return this.clouds;
    },

    rotateClouds: function(cloudsGroup) {

        for(var i = 0, len = cloudsGroup.children.length; i < len; i++) {
            var cloud = cloudsGroup.children[i];

            if(cloud.x + cloud.width < 0) {
                cloud.x = zombiegame.game.width;
            }
        }
    },

    rotateRoades: function(roadGroup) {

        for(var i = 0, len = roadGroup.children.length; i < len; i++) {
            var road = roadGroup.children[i];

            if(road.x + road.width < 0) {
                road.x = zombiegame.game.width + 10 + this.getRandomInt(-10, 50);
                road.y = road.y + this.getRandomInt(-20, 20);
            }
        }
    },

    createRoad: function(x, y, key, roadGroup, speed = 0) {
        if(roadGroup === null || roadGroup === undefined)
            roadGroup = zombiegame.game.add.group()

        var road = roadGroup.create(x, y, key);
        zombiegame.game.physics.enable(road, Phaser.Physics.ARCADE);
        road.body.immovable = true;
        road.body.friction = new Phaser.Point(0, 0);
        road.body.velocity.x = -speed;
        return roadGroup;
    },
}