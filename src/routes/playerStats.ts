import { PlayerAverageService } from "../services/playerAverages";
import { PlayerTotalService } from "../services/playerTotals";

const PlayerStatRoutes = {
  initiateTotals: async (_, res) => {
    try {
      await PlayerTotalService.initiateAll();
      res.status(200).json({ message: "Initiated Total stats" });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  resetTotals: async (_, res) => {
    try {
      await PlayerTotalService.resetAll();
      res.status(200).json({ message: "Reset player totals" });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  initiateAverages: async (_, res) => {
    try {
      await PlayerAverageService.initiateAll();
      res.status(200).json({ message: "Initiated average stats" });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  resetAverages: async (_, res) => {
    try {
      await PlayerAverageService.resetAll();
      res.status(200).json({ message: "Reset player averages" });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export { PlayerStatRoutes };
