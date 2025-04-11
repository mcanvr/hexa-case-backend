import { Router } from 'express';
import {
  createLogoController,
  getAllLogosController,
  getLatestLogoController,
} from '../controllers/logo.controller';
import { validateYupSchema } from '../middleware/validateYupSchema'; // Import Yup validation middleware
import { asyncHandler } from '../utils/asyncHandler';
import { createLogoSchema } from '../validation/logo.validation'; // Import Yup schema

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logos
 *   description: API for managing generated logos
 */

/**
 * @swagger
 * /logos:
 *   get:
 *     summary: Retrieve a list of generated logos
 *     tags: [Logos]
 *     description: Fetches all documents from the 'generated_logos' collection.
 *     responses:
 *       200:
 *         description: A list of logos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GeneratedLogo'
 *       500:
 *         description: Internal server error
 */
router.get('/logos', asyncHandler(getAllLogosController));

/**
 * @swagger
 * /logos/latest:
 *   get:
 *     summary: Retrieve the latest generated logo
 *     tags: [Logos]
 *     description: Fetches the most recently created document from the 'generated_logos' collection.
 *     responses:
 *       200:
 *         description: The latest logo document.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneratedLogo'
 *       404:
 *         description: No logos found
 *       500:
 *         description: Internal server error
 */
router.get('/logos/latest', asyncHandler(getLatestLogoController));

/**
 * @swagger
 * /logos:
 *   post:
 *     summary: Create a new generated logo entry
 *     tags: [Logos]
 *     description: Adds a new document to the 'generated_logos' collection.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLogoInput'
 *     responses:
 *       201:
 *         description: Logo created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneratedLogo'
 *       400:
 *         description: Bad request - Missing required fields.
 *       500:
 *         description: Internal server error
 */
router.post(
  '/logos',
  validateYupSchema(createLogoSchema), // Apply Yup validation middleware with the schema
  asyncHandler(createLogoController),
);

export default router;
