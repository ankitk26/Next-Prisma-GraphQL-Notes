import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { getUser } from "../lib/user";
import { IUser } from "../types/types";

export type Context = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  user: IUser;
};

export async function createContext({ req, res }): Promise<Context> {
  const user = await getUser(req, prisma);
  return { prisma, req, res, user };
}
