import { GamePlayer } from "@prisma/client";

const PlayerService = {
  getTotals: (
    games: GamePlayer[]
  ): { totals: GamePlayer; gameCount: number } => {
    const totals: GamePlayer = games.reduce(
      (acc, cur) => {
        return {
          id: acc.id,
          player_id: acc.player_id,
          minutes: cur.minutes + acc.minutes,
          fga: cur.fga + acc.fga,
          fgm: cur.fgm + acc.fgm,
          tpa: cur.tpa + acc.tpa,
          tpm: cur.tpm + acc.tpm,
          fta: cur.fta + acc.fta,
          ftm: cur.ftm + acc.ftm,
          oreb: cur.oreb + acc.oreb,
          dreb: cur.dreb + acc.dreb,
          reb: cur.reb + acc.reb,
          ast: cur.ast + acc.ast,
          stl: cur.stl + acc.stl,
          blk: cur.blk + acc.blk,
          to: cur.to + acc.to,
          pf: cur.pf + acc.pf,
          pts: cur.pts + acc.pts,
        };
      },
      {
        id: "",
        player_id: "",
        minutes: 0,
        fga: 0,
        fgm: 0,
        tpa: 0,
        tpm: 0,
        fta: 0,
        ftm: 0,
        oreb: 0,
        dreb: 0,
        reb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        to: 0,
        pf: 0,
        pts: 0,
      }
    );

    return {
      totals,
      gameCount: games.length,
    };
  },
  getAverages: (
    totals: Partial<GamePlayer>,
    gameCount: number
  ): Partial<GamePlayer> => {
    let averages: Partial<GamePlayer> = {};
    for (let key in totals) {
      averages[key] = totals[key] / gameCount;
    }
    return averages;
  },
};

export { PlayerService };
