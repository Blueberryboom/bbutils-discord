console.log("Node is running");
console.log("Node version:", process.version);
console.log("Token present:", !!process.env.DISCORD_TOKEN);

setInterval(() => {
  console.log("Still alive");
}, 5000);
