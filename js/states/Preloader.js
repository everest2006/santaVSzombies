module.exports = {
    preload: function() {
        this.game.load.image('bg', 'assets/images/bg.png');
        this.game.load.image('h1', 'assets/images/road.png');
        this.game.load.image('h2', 'assets/images/road.png');


        this.load.image('fontMenu', './assets/images/menu.jpg');
        this.load.image('button', './assets/images/button.jpg');


        this.game.load.image('bullet', 'assets/images/bullet.png');
        this.game.load.image('magazine', 'assets/images/magazine.png');
        this.game.load.image('capsule', 'assets/images/capsule.png');
        this.game.load.image('cloud', 'assets/images/clouds.png');

        this.game.load.image('logo', 'assets/images/logo.png');

        this.game.load.image('shootBtn', 'assets/images/shoot.png');
        this.game.load.image('jumpBtn', 'assets/images/jump.png');
        this.game.load.spritesheet('musicButton', 'assets/images/musicButton.png', 64, 42);

        this.game.load.image('blood', 'assets/images/blood.png');
        this.game.load.image('bullet1', 'assets/images/bullet1.png');
        this.game.load.image('bullet2', 'assets/images/bullet2.png');

        this.game.load.spritesheet('player', 'assets/images/santa.png', 35, 34);
        this.game.load.spritesheet('zombie', 'assets/images/z1.png', 22, 30);

        this.game.load.bitmapFont('font1', 'assets/fonts/font.png',
            'assets/fonts/font.fnt');

        this.game.load.audio('shootSound', ['assets/sounds/shoot.mp3',
            'assets/sounds/shoot.ogg'
        ]);
        this.game.load.audio('zombieSound', ['assets/sounds/zombie.mp3',
            'assets/sounds/zombie.ogg'
        ]);
        this.game.load.audio('reloadSound', ['assets/sounds/reload.mp3',
            'assets/sounds/reload.ogg'
        ]);
        this.game.load.audio('deadSound', ['assets/sounds/dead.mp3',
            'assets/sounds/dead.ogg'
        ]);
        this.game.load.audio('music', ['assets/sounds/music.mp3',
            'assets/sounds/music.ogg'
        ]);
    },

    create: function() {
        this.game.state.start("Menu");
    }
}