import { PlayerQuery } from "../db/player";
import { PlayerService } from "../services/player";

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
  playerAverages: async (req, res) => {
    const { id } = req.params;
    const player = await PlayerQuery?.findById(id, {
      includeGames: true,
    });
    const games = player?.GamePlayer;

    if (!games) {
      res.status(400).json({ error: "There was an error with your request." });
      return;
    }

    if (games) {
      const { totals, gameCount } = PlayerService.getTotals(games);
      const averages = PlayerService.getAverages(totals, gameCount);

      res.json({ averages });
    }
  },
};

export { PlayerRoutes };
