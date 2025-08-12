// src/types/sequelize.types.ts (or a similar location)
import { Model } from 'sequelize-typescript';

/**
 * Strips all Sequelize Model methods and properties from a model class,
 * leaving only the data attributes.
 */
export type Plain<T extends Model> = Omit<T, keyof Model>;
