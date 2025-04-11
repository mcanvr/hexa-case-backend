"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logo_controller_1 = require("../controllers/logo.controller");
const validateYupSchema_1 = require("../middleware/validateYupSchema"); // Import Yup validation middleware
const asyncHandler_1 = require("../utils/asyncHandler");
const logo_validation_1 = require("../validation/logo.validation"); // Import Yup schema
const router = (0, express_1.Router)();
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
router.get('/logos', (0, asyncHandler_1.asyncHandler)(logo_controller_1.getAllLogosController));
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
router.get('/logos/latest', (0, asyncHandler_1.asyncHandler)(logo_controller_1.getLatestLogoController));
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
router.post('/logos', (0, validateYupSchema_1.validateYupSchema)(logo_validation_1.createLogoSchema), // Apply Yup validation middleware with the schema
(0, asyncHandler_1.asyncHandler)(logo_controller_1.createLogoController));
exports.default = router;
