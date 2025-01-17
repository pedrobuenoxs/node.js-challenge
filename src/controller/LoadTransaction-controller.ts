import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";

export class LoadTransactionController {
  constructor(private repository: TransactionRepository) {}

  handle(req: Request, res: Response) {
    const { startDate, endDate, limit } = req.params;
    this.repository
      .loadRecord(startDate, endDate, limit)
      .then((result) => {
        return res.status(200).json({
          record: result,
        });
      })
      .catch((err) => {
        return err;
      });
  }
}
