import express from "express";
import { detectLocation } from "../controller/location.controller.js";

export const countrydetect = express.Router();

countrydetect.get("/", detectLocation);
