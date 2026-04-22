import index from "./index.html";

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  routes: {
    "/": index,
    "/assets/*": (req) => {
      const url = new URL(req.url);
      return new Response(Bun.file(`.${url.pathname}`));
    },
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`http://localhost:${server.port}`);
