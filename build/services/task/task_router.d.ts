import express from "express";
import { Connection } from "typeorm";
export declare const createRouter: (connection: Connection) => express.Router;
