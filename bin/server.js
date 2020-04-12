const app = require("../src/app.js");
const port = process.env.PORT || "3000";

app.server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
