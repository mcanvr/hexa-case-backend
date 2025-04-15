import { Request, Response } from 'express';
import * as logoService from '../services/logo.service';
import { CreateLogoData } from '../services/logo.service';
import { NotFoundError } from '../utils/errors';

export const getAllLogosController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const logos = await logoService.getAllLogos();
  res.json(logos);
};

export const getLatestLogoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const latestLogo = await logoService.getLatestLogo();
  if (!latestLogo) {
    throw new NotFoundError('Latest logo not found');
  }
  res.json(latestLogo);
};

export const createLogoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const logoData = req.body as CreateLogoData;
    const newLogo = await logoService.createLogo(logoData);
    res.status(201).json(newLogo);
  } catch (error) {
    console.error('Error creating logo:', error);
    res.status(500).json({ error: 'Failed to create logo' });
  }
};
