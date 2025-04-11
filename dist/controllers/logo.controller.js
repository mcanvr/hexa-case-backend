"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogoController = exports.getLatestLogoController = exports.getAllLogosController = void 0;
const logoService = __importStar(require("../services/logo.service"));
const errors_1 = require("../utils/errors");
const getAllLogosController = async (req, res) => {
    const logos = await logoService.getAllLogos();
    res.json(logos);
};
exports.getAllLogosController = getAllLogosController;
const getLatestLogoController = async (req, res) => {
    const latestLogo = await logoService.getLatestLogo();
    if (!latestLogo) {
        throw new errors_1.NotFoundError('Latest logo not found');
    }
    res.json(latestLogo);
};
exports.getLatestLogoController = getLatestLogoController;
const createLogoController = async (req, res) => {
    const logoData = req.body;
    const newLogo = await logoService.createLogo(logoData);
    res.status(201).json(newLogo);
};
exports.createLogoController = createLogoController;
