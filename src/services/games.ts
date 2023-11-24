import { GamePlayer } from "@prisma/client";
import { PlayerQuery } from "src/db/player";
import { v4 as uuidv4 } from "uuid";

const GameService = {
  addGame: async (playerId: string) => {
    const player = await PlayerQuery.findById(playerId, { includeGames: true });
    const games = player?.GamePlayer;

    if (!games) return false;

    const randomGameId = (max: number) => Math.floor(Math.random() * max);
    const playerGameCount = games.length;

    const game: GamePlayer = {
      id: uuidv4(),
      minutes: games[randomGameId(playerGameCount)].minutes,
      fga: games[randomGameId(playerGameCount)].fga,
      fgm: games[randomGameId(playerGameCount)].fgm,
      tpa: games[randomGameId(playerGameCount)].tpa,
      tpm: games[randomGameId(playerGameCount)].tpm,
      fta: games[randomGameId(playerGameCount)].fta,
      ftm: games[randomGameId(playerGameCount)].ftm,
      oreb: games[randomGameId(playerGameCount)].oreb,
      dreb: games[randomGameId(playerGameCount)].dreb,
      reb: 0,
      ast: games[randomGameId(playerGameCount)].ast,
      stl: games[randomGameId(playerGameCount)].stl,
      blk: games[randomGameId(playerGameCount)].blk,
      to: games[randomGameId(playerGameCount)].to,
      pf: games[randomGameId(playerGameCount)].pf,
      pts: 0,
      date: new Date(),
      player_id: playerId,
    };

    // Confirm fgm > tpm --> if not, fgm = tpm
    if (game.tpm > game.fgm) game.fgm = game.tpm;

    // Confirm tpa > tpm --> if not, tpa = tpm
    if (game.tpm > game.tpa) game.tpa = game.tpm;

    // Confirm fga > fgm --> if not, fga = fgm
    if (game.fgm > game.fga) game.fgm = game.fga;

    // Confirm fga > tpa --> if not, fga = tpa
    if (game.tpa > game.fga) game.fga = game.tpa;

    // reb = oreb + dreb
    game.reb = game.oreb + game.dreb;

    // calculate points
    const twoPointerMakes = game.fgm - game.tpm;
    const freeThrowPoints = game.ftm;
    const threePointerPoints = game.tpm * 3;
    const twoPointerPoints = twoPointerMakes * 2;
    game.pts = freeThrowPoints + threePointerPoints + twoPointerPoints;

    // TODO: instead of returning this game, use the games db service to create a game, then use the playerTotals DB service to update totals
    // TODO: make some loggin here so when route is run it's all good
    return game;
  },
};

export { GameService };
