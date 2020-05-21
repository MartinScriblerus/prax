module.exports = function(sequelize, DataTypes) {

	var Relation = sequelize.define('Relation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
		
			origin: { 
			type: DataTypes.INTEGER,
			
		},
			// destiny: DataTypes.INTEGER,
			content: DataTypes.STRING,
			
		},
		{
			timestamps: false
		}
	);
	return Relation;
	}