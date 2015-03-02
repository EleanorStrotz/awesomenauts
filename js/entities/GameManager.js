//removes the player and resets him if he dies
//adds gold
//manages creeps
game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		//creepe cannot pause at all
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		

		//controls when the creep spons
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);

		}

		//controls when the creep spons
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			//controls when the creep spons
			this.lastCreep = this.now;
			//bulids a creep and puts it into the world
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);

			//var creepe1 = me.pool.pull("Player2", 1000, 0, {});
			//me.game.world.addChild(creepe, 5);

		}

		return true;
	}
});

//manages the players death
//oragnizes the code
game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;

	},

	update: function(){
		//dead function in game manager
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
	}
});



       

