import fastify from "fastify";

const app = fastify();

app.get("/", () => {
  return 'Hello World';
});

app.listen({ port: 8000 }, () => {
  console.log("Server is running on port 8000");
});