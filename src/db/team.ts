import { prisma } from "../prisma";

type Options = {
  includePlayers?: boolean;
};

const TeamQuery = {
  findAll: async () => {
    const teams = await prisma.team.findMany();
    return teams;
  },
  findById: async (id: string, opts?: Options) => {
    const team = await prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        Player: !!opts?.includePlayers,
      },
    });
    return team;
  },
};

export { TeamQuery };
