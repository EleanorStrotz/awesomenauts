game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		//creepe cannot pause at all
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();

		//dead function in game manager
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}

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

