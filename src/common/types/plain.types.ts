// src/types/sequelize.types.ts (or a similar location)
import { Model } from 'sequelize-typescript';

/**
 * Strips all Sequelize Model methods and properties from a model class,
 * leaving only the data attributes.
 *
 * This type is designed to deal with sequelize entity models
 * so we don't need to create seperate interfaces for each one.
 *
 * This version is specifically designed to KEEP the `id` property,
 * which is part of the base Model but essential for relations and payloads.
 */
export type Plain<T extends Model> = Omit<T, Exclude<keyof Model, 'id'>>;
