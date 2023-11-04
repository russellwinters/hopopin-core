import { PlayerTotalService } from "../services/playerTotals";

const PlayerStatRoutes = {
  initiateTotals: async (req, res) => {
    try {
      await PlayerTotalService.initiateAll();
      res.status(200).json({ message: "Initiated Total stats" });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export { PlayerStatRoutes };
