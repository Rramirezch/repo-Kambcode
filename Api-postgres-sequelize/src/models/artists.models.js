import sequalize from "../db/sequelize.js";
import { DataTypes } from "sequelize";
import Songs from "./songs.model.js";

const Artists = sequalize.define("artists", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
    },
    photoUrl: DataTypes.STRING
});

Artists.hasMany(Songs, {
    foreignKey: 'artistId',
    sourceKey: 'id',
});

Songs.belongsTo(Artists, {
    foreignKey: 'artistId',
    targetKey: 'id'
});

export default Artists;