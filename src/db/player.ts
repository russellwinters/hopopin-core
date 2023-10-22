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
};

export { PlayerQuery };
