import { prisma } from "../prisma";

const PlayerRoutes = {
  playerById: async (req, res) => {
    const { id } = req.params;
    const player = await prisma.player.findUnique({
      where: {
        id,
      },
    });
    res.json({ player });
  },
  playerGames: async (req, res) => {
    const { id } = req.params;
    const player = await prisma.player.findUnique({
      where: {
        id,
      },
      include: {
        GamePlayer: true,
      },
    });

    const games = player?.GamePlayer;

    res.json({ games });
  },

  // TODO: Validate routes below
};

export { PlayerRoutes };
