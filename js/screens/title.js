game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//adds title screen to the beggining of the game
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	    //binds the enter key so that you can escape from the title screen
	    //and go to the game, by pressing the enter key
		me.input.bindKey(me.input.KEY.ENTER, "start");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "white");
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Awesomenauts!", 450, 130);
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}
		})));

		this.handler = me.event.subscribe
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		; // TODO
	}
});
//4:34