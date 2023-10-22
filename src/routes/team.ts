import { prisma } from "../prisma";

const TeamRoutes = {
  team: async (_, res) => {
    const teams = await prisma.team.findMany();
    res.json({ teams });
  },
  teamById: async (req, res) => {
    const { id } = req.params;
    const team = await prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        Player: true,
      },
    });
    res.json({ team });
  },
  teamRoster: async (req, res) => {
    const { id } = req.params;
    const team = await prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        Player: true,
      },
    });

    const roster = team?.Player;

    res.json({ roster });
  },
};

export { TeamRoutes };
