import sequalize from "../db/sequelize.js";
import { DataTypes } from "sequelize";
import Artists from "./artists.models.js";

const Songs = sequalize.define("songs", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistId: {
        type: DataTypes.INTEGER,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },    
    duration: {
        type: DataTypes.INTEGER,
    },
    coverUrl: DataTypes.STRING
});

export default Songs;