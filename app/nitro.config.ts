//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "src",
  compatibilityDate: "2024-11-29",
  vercel: {
    functions: {
      maxDuration: 60,
    },
    regions: ["gru1"],
  },
  logLevel: 5,
});

