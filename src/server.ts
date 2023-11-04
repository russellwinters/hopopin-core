import express from "express";
import { TeamRoutes } from "./routes/team";
import { PlayerRoutes } from "./routes/player";
import { PlayerStatRoutes } from "./routes/playerStats";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", async (_, res) => {
  res.json({ message: "Hello World" });
});

// Teams
app.get("/team", TeamRoutes.team);
app.get("/team/:id", TeamRoutes.teamById);
app.get("/team/:id/roster", TeamRoutes.teamRoster);
app.get("/team/:id/roster/averages", TeamRoutes.teamRosterAverages);
// Players
app.get("/player/:id", PlayerRoutes.playerById);
app.get("/player/:id/games", PlayerRoutes.playerGames);
app.get("/player/:id/averages", PlayerRoutes.playerAverages);
// Stats
app.get("/stats/totals/init", PlayerStatRoutes.initiateTotals);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
