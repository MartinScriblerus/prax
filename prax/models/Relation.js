// This exported module is a "model" that uses sequelize and 
// routed data to define the Relation table in our SQL database

// ========================================================================
//  Creating our Relation model
// ========================================================================
module.exports = function(sequelize, DataTypes) {
    
    var Relation = sequelize.define('relation',
        {
            origin: {
                    type: DataTypes.INTEGER,
                    allowNull: false
            },
        
            unseencount: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        })

        
        return Relation;
}