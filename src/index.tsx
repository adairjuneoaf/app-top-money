import React from "react";
import ReactDOM from "react-dom";
import { Server, Model } from "miragejs";

import { App } from "./App";

new Server({
  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          description: "Freela de website",
          type: "input",
          category: "Desenvolvimento",
          amount: 6000,
          createAt: new Date("2021-02-12 09:00:00"),
        },
        {
          id: 2,
          description: "Aluguel",
          type: "output",
          category: "Casa",
          amount: 850,
          createAt: new Date("2021-02-14 11:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transactions");
    });
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transactions", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
