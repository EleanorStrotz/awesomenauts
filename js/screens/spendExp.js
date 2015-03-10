game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//adds title screen to the beggining of the game
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
	    //binds the F1 key so that the player can increase their gold
	    me.input.bindKey(me.input.KEY.F1, "F1");
	    me.input.bindKey(me.input.KEY.F1, "F1");
	    me.input.bindKey(me.input.KEY.F1, "F1");
	    me.input.bindKey(me.input.KEY.F1, "F1");
	    me.input.bindKey(me.input.KEY.F1, "F1");
	    me.input.bindKey(me.input.KEY.F1, "F1");

		//adds the word awesomenauts to the game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				//me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//function renderer tells the font size of the words in quotations
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1:  INCREASE GOLD PRODUCTION CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD ", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE ", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH ", this.pos.x, this.pos.y + 250);
			}


		})));
		
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});
// video 44, 6:08
	