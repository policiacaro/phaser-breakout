function preload() {
    //game configuration
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = "rgb(210, 210, 210)";

    //assets for game, images & sprites
    game.load.image("ball", "img/ball.png");
    game.load.image("paddle", "img/paddle.png");
    game.load.image("brick","img/brick.png");
    game.load.spritesheet("ball", "img/wobble.png", 20, 20);
    game.load.spritesheet("button", "img/button.png", 120, 40);
};

function create() {
    //creation of physics & bodies
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    //ball creation, config and settings
    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 70, "ball");
    ball.animations.add("wobble", [0, 1, 0, 2, 0, 1, 0, 2, 0], 24);
    ball.anchor.set(0.5);

    //paddle creation, config and settings
    paddle = game.add.sprite(
        game.world.width * 0.5,
        game.world.height - 25,
        "paddle"
    );
    paddle.anchor.set(0.5, 1);

    //enabling physics and specifying physics settings for bodies, i.e. world bounds and bounce
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.events.onOutOfBounds.add(ballLeaveScreen, this);
    ball.checkWorldBounds = true;

    paddle.body.immovable = true;

    initBricks();

    textStyle = {font: "14px Arial", fill: "#954F9C"};

    lifeLostText = game.add.text(
        game.world.width * 0.5,
        game.world.height * 0.5,
        "Life lost, click to continue",
        textStyle
    );
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;

    startButton = game.add.button(
        game.world.width * 0.5,
        game.world.height * 0.5,
        "button",
        startGame,
        this,
        1,
        0,
        2
    );
    startButton.anchor.set(0.5);
};

function update() {
    game.physics.arcade.collide(ball, paddle, ballHitPaddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    if (playing) {
        paddle.x = game.input.x ;
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      console.log("down is pressed");
    }
};

function startGame() {
    startButton.destroy();
    game.input.keyboard.enabled = true;
    ball.body.velocity.set(250, -250);
    playing = true;
};