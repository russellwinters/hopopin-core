import {GamePlayer, GameTeam} from "@prisma/client";
import { prisma } from "../prisma";

const GameQuery = {
  getSingleGame: async (playerId: string): Promise<GamePlayer> => {
    const games = await prisma.gamePlayer.findMany({where: {
      player_id: playerId
      },
    orderBy: {
      date: 'desc'
    }, take: 5});

    const maxNum = games.length < 5 ? games.length : 5;
    const indexToTake = Math.floor(Math.random() * maxNum)
    return games[indexToTake];

  }

}

const GameMutation = {
  addGame: async (game: GamePlayer) => {
    try {
      return await prisma.gamePlayer.create({ data: game });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  addGameTeam: async (game: GameTeam) => {
    try {
      return await prisma.gameTeam.create({ data: game });
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
export { GameQuery, GameMutation };
