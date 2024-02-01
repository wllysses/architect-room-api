import { app } from "./app";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("🚀 Server is running at port " + PORT));
