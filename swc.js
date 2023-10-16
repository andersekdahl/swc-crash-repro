const { transform } = require("@swc/core");
const Visitor = require("@swc/core/Visitor").default;

module.exports.compile = async function (fileName, content) {
  const output = await transform(content, {
    filename: fileName,
    plugin: (m) => new Visitor().visitProgram(m),
  });
  return output.code;
};
