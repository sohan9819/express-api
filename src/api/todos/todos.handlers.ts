import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Todos, TodoWithId, Todo } from './todos.model';
import { Response, Request, NextFunction } from 'express';

export const findAll = async (
  req: Request,
  res: Response<TodoWithId[]>,
  next: NextFunction
) => {
  try {
    const todos = await Todos.find().toArray();
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
    res.status(201);
    res.json({ _id: insertResult.insertedId, ...req.body });
  } catch (error) {
    next(error);
  }
};

export const findOne = async (
  req: Request<ParamsWithId, TodoWithId, {}>,
  res: Response<TodoWithId>,
  next: NextFunction
) => {
  try {
    const result = await Todos.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request<ParamsWithId, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction
) => {
  try {
    const result = await Todos.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      }
    );
    if (!result.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction
) => {
  try {
    const result = await Todos.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.acknowledged && result.deletedCount === 0) {
      res.status(404);
      throw new Error("Record doesn't exist or already deleted");
    }
    if (!result.acknowledged) throw new Error('Error deleting todo');
    res.status(200);
    res.json({ message: `Deleted ${result.deletedCount} Todo Successfully` });
  } catch (error) {
    next(error);
  }
};
