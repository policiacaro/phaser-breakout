function initBricks() { //creates the bricks and their settings, like size and position
    brickInfo = {
        width: 50,
        height: 25,
        count: {
            row: 3,
            col: 7,
        },
        offset: {
            top: 30,
            left: 90,
        },
        padding: 10,
    };
    bricks = game.add.group();

    for (let column = 0; column < brickInfo.count.col; column++) {
        for ( let row = 0; row < brickInfo.count.row; row++) {
            const brickX = column * brickInfo.width + brickInfo.offset.left;
            const brickY = row * brickInfo.height + brickInfo.offset.top;
            newBrick = game.add.sprite(brickX, brickY, "brick");
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
};

function ballLeaveScreen() {
    lives--;
    if (lives) {
        livesDiv.innerHTML = `Lives: ${lives}`;
        lifeLostText.visible = true;
        ball.reset(game.world.width * 0.5, game.world.height - 25);
        paddle.reset(game.world.width * 0.5, game.world.height -5);
        game.input.onDown.addOnce(() => {
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
        }, this);
    } else {
        alert("You lost, game over!");
        location.reload();
    }
 };

function ballHitBrick(ball, brick) {
    const killTween = game.add.tween(brick.scale);
    killTween.to({ x: 0, y: 0 }, 100, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(() => {
        brick.kill();
    }, this);
    killTween.start();

    score += 10;
    scoreDiv.innerHTML = `Points: ${score}`;

    if (score === brickInfo.count.row * brickInfo.count.col * 10) {
        alert("You won the game, congratulations!");
        location.reload();
    }
};

function ballHitPaddle(ball, paddle){
    ball.animations.play("wobble");
    ball.body.velocity.x = -5 * (paddle.x - ball.x);
    if (ball.body.velocity.x <= 100 && ball.body.velocity.x >= -100){
        ball.body.velocity.y = -280;
    } else {
        ball.body.velocity.y = -250;
    }
};