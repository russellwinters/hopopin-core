import { PlayerTotalService } from "../services/playerTotals";
import {PlayerQuery} from "../db/player";
import {GameService} from "../services/games";
import {PlayerService} from "../services/player";
import {PlayerAverageService} from "../services/playerAverages";

const PlayerStatRoutes = {
  getPlayerTotals: async (req, res) => {
    try {
      const { id } = req.params;

      const totals = await PlayerTotalService.getPlayerTotals(id);
      res.status(200).json({ totals });
    } catch (e) {
      console.log({ e });
      res.status(500).json({ message: "Internal Server Error." });
    }
  },
  addPlayerGames: async (_, res) => {
    // TODO: allow this route to take a count param that will add more games
    try {
      const players = await PlayerQuery.findAll();
      const results = await Promise.allSettled(
          players.map(p => GameService.addGame((p.id)))
      )

      //  TODO: Some sort of logging to track the results
      res.status(200).json({message: `Successfully added ${results.length} games.`})
    } catch (e) {
      console.log({ e });
      res.status(500).json({ message: "Internal Server Error." });
    }
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
      const averages = PlayerAverageService.getAverages(totals, gameCount);

      res.json({ averages });
    }
  },
};

export { PlayerStatRoutes };
