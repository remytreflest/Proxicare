/// <reference types="jest" />

export const User = {
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(), 
  update: jest.fn(),
  destroy: jest.fn(),
};