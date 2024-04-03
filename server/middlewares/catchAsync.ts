import { Request, Response, NextFunction } from 'express';

const catchAsync = (errorFunction: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(errorFunction(req, res, next)).catch(next);
  };

export default catchAsync;
