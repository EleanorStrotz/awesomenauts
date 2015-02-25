// since it is a class both letter are capitilized
// player class. Shows the image that the player is, the height and width
//also the shape of it
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "player", 
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0, 0, 100, 70)).toPolygon();
			} 
			}]);
		//sets type so that creep can collide with it
		this.type = "PlayerEntity";
		//sets players health
		//uses the global variable that helps the player loose health
		//variable located in game.js
		this.heatlth = game.data.playerHealth;
		//sets the speed of the character
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//keeps track of what direction your character is going
		this.facing = "right";
		//keeps track of what time it is for the game
		this.now = new Date().getTime();
		//lets the character hit the other characters over and over again
		this.lastHit = this.now;
		//players death function
		//what happens if the player dies
		this.dead = false;
		//a gold is added when the creep dies from attack
		this.attack = game.data.playerAttack;
		this.lastAttack = new Date().getTime();
		//where ever the player goes the screen follows
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);


		//this anmiantion is used for when we are just standing
		this.renderable.addAnimation("idle", [78]);
		//adds animation to orcs/ characters walk
		// 80 at the end is the speed of the walk
		// the numbers in the brackets are the different pics we are using for the animation
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//adds animation to the action attack
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

		//sets currect animation
		this.renderable.setCurrentAnimation("idle");

	},

	update: function(delta){
		//updates this.now
		this.now = new Date().getTime();
		//makes the player die
		if (this.health <= 0){
			this.dead = true;
		}

		//checks and sees if the right key is pressed
		if(me.input.isKeyPressed("right")){
			// adds the position of my x by adding the velocity defined above in
			// setVelocity() and multiplying it by me.timer.tick
			// me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//checks what way your character is going
			this.facing = "right";
			//flips the character so he doesnt go backwards
			this.flipX(true);
			//if we press the wrong button then the else statement will go into effect
			// if statement binds the left key so that we can move left
		}else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);

			}else{
			this.body.vel.x = 0;
		}
		//not in else statement because jumping involves the y axis not the x
		// binds the space bar so that we can jump
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			me.audio.play("stomp");

		}


		//if attack key is pressed character will attack
		if(me.input.isKeyPressed("attack")){
			//checks if it has gone through its animation stage
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets the current animation to attackand once that is over
				// goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start this sequence we begin
				// from the the first animation, not wherever we left off when we
				// switched to another animation
				//this.renderable.setCurrentAnimationFrame();
				me.audio.play("jump");
			}
		}
		//checks if character is moving
		//checks that we dont have an attack animation going on
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
		//if statement checks to see whats going on with the character
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}//else statement fixes the error of the character walking backwards
	else if(!this.renderable.isCurrentAnimation("attack")){
		this.renderable.setCurrentAnimation("idle");
	}

		//checks for collisions
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		

		// tells the code above to work
		this.body.update(delta);
		
		//another call to the parent class
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage){
		//player loses health
		this.health = this.health - damage;
		//prints out what our health is
		console.log(this.health);


	},


	// tells us if we collide with the enemy base
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
 			
 			//checks to see when character collides with enemy base
			console.log("xdif " + xdif + "ydif " + ydif);

			//jumping through the top of the enemy base
			if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			//the the player goes more than the number placed then it will stop moving
			//facing code allows us to move away from the base
			// xdif makes sure that both if statements wont trigger
			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				//stops player from moving if they hit the base
				this.body.vel.x = 0;
				// moves player back a bit
				////this.pos.x = this.pos.x - 1;
				//else if statement is used if the character is facing left
			}else if(xdif<70 && this.facing==='left' && xdif>0){
				this.body.vel.x = 0;
				////this.pos.x = this.pos.x +1;
			}
			//checks if the current animation is attack
			//uses the global variable that helps the player loose health
		    //variable located in game.js
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				//cosole.log("tower Hit");
				this.lastHit = this.now;
				//character dies/looses health when the player attacks the creep more than a certain number of attacks
				response.b.loseHealth(game.data.playerAttack);
			}
			//makes the creep loose health
		}else if(response.b.type==='EnemyCreep'){
			//lets you loose health if you are facing the x axis
			var xdif = this.pos.x - response.b.pos.x;
			//lets you loose health if you are facing the y axis
			var ydif = this.pos.y - response.b.pos.y;

			//loose health if character comes in form the right or left
			//makes it so that we cant walk right into the base
			if (xdif>0){
				////this.pos.x = this.pos.x + 1;
				//keeps track of what way we are facing
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}else{
				this.pos.x = this.pos.x - 1;
				//keeps track of what way we are facing
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			//uses the global variable that helps the player loose health
			//variable located in game.js
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
				//checks the absolute value of the y and x difference
				&& (Math.abs(ydif) <=40) && 
				(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				){
				//updates the timers
				this.lastHit = this.now;
				//linked to the line of code above 
				//if the creepe health is less than our attack, execute code in if statement
				if(response.b.health <= game.data.playerAttack){
					//adds one gold for a creep kill
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold);
				}
				//the player dies or looses health if it is attacking for too long
				//timer
				response.b.loseHealth(game.data.playerAttack);
			}
		}
	}

});
