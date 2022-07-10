import { Request, Response } from "express";
import {
  createRecord,
  updateRecord,
  deleteRecord,
  loadRecord,
  balanceAmount,
} from "../repository/index";
import { calculate } from "../utils/calcBalance";

const addTransaction = (req: Request, res: Response) => {
  const { desc, type, value } = req.body;

  try {
    if (!req.body)
      return res.status(400).json({ error: "your body params are" });
    if (!desc)
      return res.status(400).json({ error: "the description is required" });
    if (!type) return res.status(400).json({ error: "the type is required" });
    if (!value) return res.status(400).json({ error: "the value is required" });

    const data = req.body;
    createRecord(data)
      .then((result) => {
        return res.status(201).json({
          record: result,
        });
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    res.status(500).json({ error: "something went wrong." });
  }
};

const updateTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  updateRecord(id, data)
    .then((result) => {
      return res.status(201).json({
        record: result,
      });
    })
    .catch((err) => {
      return err;
    });
};

const deleteTransaction = (req: Request, res: Response) => {
  deleteRecord(req)
    .then((result) => {
      return res.status(200).json({
        record: result,
      });
    })
    .catch((err) => {
      return err;
    });
};

const loadTransaction = (req: Request, res: Response) => {
  loadRecord(req)
    .then((result) => {
      return res.status(200).json({
        record: result,
      });
    })
    .catch((err) => {
      return err;
    });
};

const loadBalance = (req: Request, res: Response) => {
  balanceAmount()
    .then((result) => {
      return res.status(200).json({
        balance: calculate(result),
      });
    })
    .catch((err) => {
      return err;
    });
};

export {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  loadTransaction,
  loadBalance,
};