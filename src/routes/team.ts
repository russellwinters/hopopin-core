import { TeamService } from "../services/team";
import { PlayerQuery } from "../db/player";
import { TeamQuery } from "../db/team";

const TeamRoutes = {
  team: async (_, res) => {
    const teams = await TeamQuery.findAll();
    res.json({ teams });
  },
  teamById: async (req, res) => {
    const { id } = req.params;
    const team = await TeamQuery.findById(id, { includePlayers: true });
    res.json({ team });
  },
  teamRoster: async (req, res) => {
    const { id } = req.params;
    const team = await TeamQuery.findById(id, { includePlayers: true });

    const roster = team?.Player;

    res.json({ roster });
  },
  teamRosterAverages: async (req, res) => {
    const { id } = req.params;
    const team = await TeamQuery.findById(id, { includePlayers: true });

    const roster = team?.Player;

    if (!roster) {
      res.status(500).json({
        message: "Cannot fetch roster.",
      });
      return;
    }

    const playerIds = roster.map((p) => p.id);
    const players = await PlayerQuery.manyById(playerIds, {
      includeGames: true,
    });

    if (!players) {
      res.status(500).json({ message: "Error fetching players." });
    }

    const playersWithAverages = TeamService.getRosterAverages(players);

    res.json({ players: playersWithAverages });
  },
};

export { TeamRoutes };
