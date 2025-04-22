import type { Response, Request, NextFunction } from 'express';

/* 
	Envolve os controllers com uma promise resolve,
	se essa função fazer throw de algum erro ela passa para a rota de erro
	Isso elimina a necessidade de envolver o controller com um try catch
*/
export const catchAsync =
	(controllerFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(controllerFunction(req, res, next)).catch(next);
	};
