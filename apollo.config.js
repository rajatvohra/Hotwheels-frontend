module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "Hotwheels-backend",
      url: "http://localhost:3000/graphql",
    },
  },
};
