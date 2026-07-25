import prisma from "../../lib/prisma";
import { toPlayerSummaryDto } from "./mapper";

export const getAllPlayers = async () => {
  const players = await prisma.player.findMany({
    orderBy: {
      fullName: "asc",
    },
  });

  return players.map(toPlayerSummaryDto);
};