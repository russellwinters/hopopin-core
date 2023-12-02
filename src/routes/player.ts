import { PlayerQuery } from "../db/player";

const PlayerRoutes = {
  playerById: async (req, res) => {
    const { id } = req.params;
    const player = await PlayerQuery?.findById(id);

    res.json({ player });
  },
  playerGames: async (req, res) => {
    const { id } = req.params;
    const player = await PlayerQuery?.findById(id, {
      includeGames: true,
    });

    const games = player?.GamePlayer;

    res.json({ games });
  },

};

export { PlayerRoutes };
