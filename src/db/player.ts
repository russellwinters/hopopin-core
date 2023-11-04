import { prisma } from "../prisma";

type Options = {
  includeGames?: boolean;
};

const PlayerQuery = {
  findById: async (id: string, opts?: Options) => {
    const player = await prisma.player.findUnique({
      where: {
        id,
      },
      include: {
        GamePlayer: !!opts?.includeGames,
      },
    });
    return player;
  },
  findAll: async (opts?: Options) => {
    const players = await prisma.player.findMany({
      include: {
        GamePlayer: !!opts?.includeGames,
      },
    });
    return players;
  },
  manyById: async (ids: string[], opts?: Options) => {
    const players = await prisma.player.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        GamePlayer: !!opts?.includeGames,
      },
    });
    return players;
  },
};

export { PlayerQuery };
