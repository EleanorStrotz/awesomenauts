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

		//this anmiantion is used for when we are just standing
		this.renderable.addAnimation("idle", [78]);
		//adds animation to orcs/ characters walk
		// 80 at the end is the speed of the walk
		// the numbers in the brackets are the different pics we are using for the animation
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

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
		this._super(me.Entity, 'init',)
	},

	update:function(){

	}

});
//5:36 11