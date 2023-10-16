const fs = require("fs");
const tsCompile = require("./tsc").compile;
const swcCompile = require("./swc").compile;

const bundleContent = fs.readFileSync("./bundle.js").toString();

(async () => {
  //const tsTime = await measure(tsCompile);
  const swcTime = await measure(swcCompile);

  //console.log("tsTime", tsTime);
  console.log("swcTime", swcTime);
})();

async function measure(compile) {
  const start = new Date();
  await compile("bundle.js", bundleContent);
  const stop = new Date();
  return stop.valueOf() - start.valueOf();
}
