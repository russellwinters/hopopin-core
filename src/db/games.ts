import { GamePlayer } from "@prisma/client";
import { prisma } from "src/prisma";

const GameMutation = {
  addGame: async (game: GamePlayer) => {
    try {
      const created = await prisma.gamePlayer.create({ data: game });
      return created;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
export { GameMutation };
