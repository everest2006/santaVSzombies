module.exports = {
    preload: function() {

    },

    create: function() {
        zombiegame.game.add.sprite(0,0,'fontMenu');
        this.createButton(zombiegame.game, zombiegame.game.world.centerX, zombiegame.game.world.centerY+32, 200 ,100,
            function () {
                this.state.start('Game');
            });

        this.cursors = this.game.input.keyboard.createCursorKeys();

        // Button for toggle music
        this.musicBtn = this.game.add.button(700, 50, 'musicButton', this.onMusicToggle, this, 1, 1, 1);

        if(this.game.model.isMusicEnabled) {
            this.musicBtn.setFrames(1, 1, 1);
        } else {
            this.musicBtn.setFrames(0, 0, 0);
        }

        if(this.game.model.music === null) {
            this.game.model.music = this.game.add.audio('music', 0.7, true);
            this.game.model.music.play('', 10, 1, true);
       }
    },

    update: function() {
        this.checkInput();
    },

    onMusicToggle: function() {
        zombiegame.game.model.isMusicEnabled = !zombiegame.game.model.isMusicEnabled;

        if(zombiegame.game.model.isMusicEnabled) {
            this.game.model.music.play('', 10, 1, true);
            this.musicBtn.setFrames(1, 1, 1);
        } else {
            zombiegame.game.model.music.stop();
            this.musicBtn.setFrames(0, 0, 0);
        }
    },

    createButton:function (game,x,y,w,h,callback) {
        var button = game.add.button(x,y,'button',callback,this,2,1,0);
        button.anchor.setTo(0.5,0.5);
        button.width = w;
        button.height = h;
    },

    checkInput: function() {
        if(this.cursors.right.isDown || this.cursors.up.isDown) {
            this.cursors.right.isDown = false;
            this.state.start('Game');
        }
    },
}