import { GamePlayer } from "@prisma/client";
import { prisma } from "../prisma";

const GameMutation = {
  addGame: async (game: GamePlayer) => {
    try {
      return await prisma.gamePlayer.create({ data: game });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
export { GameMutation };
