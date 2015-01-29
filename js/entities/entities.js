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
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			} 
			}]);
		//sets the speed of the character
		this.body.setVelocity(5, 20);
		//where ever the player goes the screen follows
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);


		//this anmiantion is used for when we are just standing
		this.renderable.addAnimation("idle", [78]);
		//adds animation to orcs/ characters walk
		// 80 at the end is the speed of the walk
		// the numbers in the brackets are the different pics we are using for the animation
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//adds animation to the action attack
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72] ,80);

		//sets currect animation
		this.renderable.setCurrentAnimation("idle");

	},

	update: function(delta){
		//checks and sees if the right key is pressed
		if(me.input.isKeyPressed("right")){
			// adds the position of my x by adding the velocity defined above in
			// setVelocity() and multiplying it by me.timer.tick
			// me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//flips the character so he doesnt go backwards
			this.flipX(true);
			}//if we press the wrong button then the else statement will go into effect
		else{
			this.body.vel.x = 0;
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
				this.renderable.setCurrentAnimationFrame();
			}
		}

		//checks if character is moving
		if(!this.body.x !== 0){
		//if statement checks to see whats going on with the character
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}//else statement fixes the error of the character walking backwards
	else{
		this.renderable.setCurrentAnimation("idle");
	}

		// tells the code above to work
		this.body.update(delta);
		
		//another call to the parent class
		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

//loads the player base from melon js
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		//tells us the tower has not been destroyed
		this.broken = false;
		//gives the tower a health
		this.health = 10;
		//even if we cannot see the screen it will still update
		this.alwaysUpdate = true;
		//if someone runs into the tower it will be able to collide
		this.body.onCollision = this.onCollision.bind(this);

		//type that can be used later during other collisons
		this.type = "PlayerBaseEntity";
		//adds animation to the tower
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		// tells us to die if health is less than zero
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}

});
// _____________________________________________________________________________________________________________________________




//loads the player base from melon js
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		//tells us the tower has not been destroyed
		this.broken = false;
		//gives the tower a health
		this.health = 10;
		//even if we cannot see the screen it will still update
		this.alwaysUpdate = true;
		//if someone runs into the tower it will be able to collide
		this.body.onCollision = this.onCollision.bind(this);

		//type that can be used later during other collisons
		this.type = "EnemyBaseEntity";

		//renderable used to set animaton
		//sets the animation to the enemy base
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		// tells us to die if health is less than zeron
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	}

});
// 4:10