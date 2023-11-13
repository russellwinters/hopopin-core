import { PlayerTotalQuery } from "../db/playerTotals";

const PlayerTotalService = {
  getPlayerTotals: async (id: string) => {
    const totals = await PlayerTotalQuery.findById(id);
    return totals;
  },
};

export { PlayerTotalService };
