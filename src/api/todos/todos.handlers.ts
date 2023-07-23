import { Todos, TodoWithId, Todo } from './todos.model';
import { Response, Request, NextFunction } from 'express';

export const findAll = async (
  req: Request,
  res: Response<TodoWithId[]>,
  next: NextFunction
) => {
  try {
    const result = Todos.find();
    const todos = await result.toArray();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const createOne = async (
  req: Request<{}, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction
) => {
  try {
    const insertResult = await Todos.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting todo');
    // console.log('Inserted Object  ', req.body);
    res.status(201);
    res.json({ _id: insertResult.insertedId, ...req.body });
  } catch (error) {
    next(error);
  }
};
