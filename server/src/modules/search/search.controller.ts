import { Request, Response } from "express";

export async function notImplementedSearch(_req: Request, res: Response) {
    return res.status(501).json({
        message: "Search module not implemented yet",
    });
}