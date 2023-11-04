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
