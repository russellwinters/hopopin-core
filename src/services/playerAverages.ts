import {PlayerStatTotal} from "@prisma/client";

const PlayerAverageService = {
    getAverages: (
        totals: PlayerStatTotal,
        gameCount: number,
    ): any => {
        let averages: any = { ...totals };
        for (let key in totals) {
            if (!["id", "player_id"].includes(key)) {
                averages[key] = (totals[key] / gameCount).toFixed((1));
            }
        }

        delete averages.games_played;
        delete averages.latest_update;


        averages.fgp = `${((averages.fgm / averages.fga) * 100).toFixed(2)}%`;
        averages.tpp = `${((averages.tpm / averages.tpa) * 100).toFixed(2)}%`;
        averages.ftp = `${((averages.ftm / averages.fta) * 100).toFixed(2)}%`;

        return { ...averages };
    },
};

export { PlayerAverageService };
