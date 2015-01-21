// TODO
// since it is a class both letter are capitilized
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, (
			image: "player", 
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape() 
			)]);
	},

	update: function(){

	}
	});
// 4:40