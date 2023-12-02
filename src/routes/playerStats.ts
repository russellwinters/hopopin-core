import { PlayerTotalService } from "../services/playerTotals";
import {PlayerQuery} from "../db/player";
import {GameService} from "../services/games";

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
};

export { PlayerStatRoutes };
