import {PlayerStatTotal} from "@prisma/client";

const PlayerAverageService = {
    getAverages: (
        totals: PlayerStatTotal,
    ): any => {
        let averages: any = { ...totals };
        for (let key in totals) {
            if (!["id", "player_id"].includes(key)) {
                averages[key] = (totals[key] / totals.games_played).toFixed((1));
            }
        }

        delete averages.games_played;
        delete averages.latest_update;


        averages.fgp = `${((averages.fgm / averages.fga) * 100).toFixed(2)}%`;
        averages.tpp = `${((averages.tpm / averages.tpa) * 100).toFixed(2)}%`;
        averages.ftp = `${((averages.ftm / averages.fta) * 100).toFixed(2)}%`;

        return { ...averages };
    },
    getBulkAverages: (bulkTotals: PlayerStatTotal[]) => {
        return bulkTotals.map(t => PlayerAverageService.getAverages(t))
    }
//     TODO: Make a service that gets averages on a player based on their totals
//     Would be a good idea to allow the param to get players based on ID so this can be a bulk request
};

export { PlayerAverageService };
