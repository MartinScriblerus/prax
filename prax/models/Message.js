module.exports = function(sequelize, DataTypes) {

	// ========================================================================
	//  Creating our Message model
	// ========================================================================

	var Message = sequelize.define('Message',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			  },
			origin: {
				type: DataTypes.STRING,
				// references: {
				// 	model: 'User',
				// 	key: 'id',
				// 	as: 'origin',
				//   },
				allowNull: true
			},
			content: {
				type: DataTypes.STRING,
				
				allowNull: false
			},

		},
	
			{
				associate:function(models){
					Message.belongsTo(models.User, {foreignKey: 'id'});
			}
	}
	);
	return Message;
}