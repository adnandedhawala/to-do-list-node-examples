import express, { Request, Response } from "express";
import { Todo } from "../models/todo";
import {
  createTodoSchema,
  editTodoSchema,
  statusChange,
} from "../validators/index";

const router = express.Router();

router.route("/").post(async (req: Request, res: Response) => {
  const { data } = req.body;
  if (!data) res.status(400).send("improper request");
  createTodoSchema
    .validate(data)
    .then(async (result) => {
      try {
        const todoItem = new Todo(result);
        let response = await todoItem.save();
        res.status(200).send(response);
      } catch (error: any) {
        res.status(500).send(error.message);
      }
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

router.route("/all").get(async (req: Request, res: Response) => {
  try {
    let result = await Todo.find();
    res.status(200).send({ data: result });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    try {
      let result = await Todo.findById(req.params.id);
      if (result) {
        res.status(200).send({ data: result });
      } else {
        res.status(404).send("Data not found");
      }
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  })
  .put((req: Request, res: Response) => {
    const { data } = req.body;
    if (!data) res.status(400).send("improper request");
    editTodoSchema
      .validate(data)
      .then(async (updateObj) => {
        try {
          await Todo.findByIdAndUpdate(req.params.id, updateObj);
          res.status(200).send("data updated successfully");
        } catch (error: any) {
          res.status(500).send(error.message);
        }
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.status(200).send("data deleted successfully");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });

router.route("/:id/mark-status").patch((req: Request, res: Response) => {
  const { data } = req.body;
  if (!data) res.status(400).send("improper request");
  statusChange
    .validate(data)
    .then(async (updateObj) => {
      try {
        await Todo.findByIdAndUpdate(req.params.id, updateObj);
        res.status(200).send("data updated successfully");
      } catch (error: any) {
        res.status(500).send(error.message);
      }
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

export default router;
