import { GamePlayer, PlayerStatTotal } from "@prisma/client";

const PlayerService = {
  getTotals: (
    games: GamePlayer[],
    updateTimestamp: Date = new Date()
  ): { totals: PlayerStatTotal; gameCount: number } => {
    const totals: PlayerStatTotal = games.reduce(
      (acc, cur) => {
        return {
          id: cur.id,
          player_id: cur.player_id,
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
          latest_update: acc.latest_update,
          games_played: acc.games_played + 1,
        };
      },
      {
        id: "",
        player_id: "",
        latest_update: updateTimestamp,
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
        games_played: 0,
      }
    );

    return {
      totals: { ...totals, latest_update: updateTimestamp },
      gameCount: games.length,
    };
  },
  getAverages: (
    totals: PlayerStatTotal,
    gameCount: number,
    updateTimestamp: Date = new Date()
  ): any => {
    let averages: any = { ...totals };
    for (let key in totals) {
      if (!["id", "player_id"].includes(key)) {
        averages[key] = totals[key] / gameCount;
      }
    }

    delete averages.games_played;

    return { ...averages, latest_update: updateTimestamp };
  },
};

export { PlayerService };
