import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { Car } from '../cars/entities/car.entity';
import { User } from '../users/entities/user.entity';

console.log('Directory name:', __dirname);
console.log('Current working directory:', process.cwd());

// ... the rest of your code will now work correctly
const sequelize = new Sequelize({
  ...databaseConfig,
  // models: [__dirname + `/../**/*.entity.ts`],
  // modelMatch: (filename, member) => {
  //   return (
  //     filename.substring(0, filename.indexOf('.entity')) ===
  //     member.toLowerCase()
  //   );
  // },

  models: [User, Car],
  logging: console.log,
  define: {
    // freezeTableName: true, // Use model name as table name
    underscored: true, // Use snake_case for columns
    timestamps: true,
  },
  // synchronize: true,
});

void (async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('Loaded models:', Object.keys(sequelize.models));
    await sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
