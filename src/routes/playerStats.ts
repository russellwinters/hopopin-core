import { PlayerTotalService } from "../services/playerTotals";

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
  addPlayerGames: async (req, res) => {
    try {
      const { count } = req.params;

      // TODO: Get All players, then run GameService.addGame() for each player
    } catch (e) {
      console.log({ e });
      res.status(500).json({ message: "Internal Server Error." });
    }
  },
};

export { PlayerStatRoutes };
