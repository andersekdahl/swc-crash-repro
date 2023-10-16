const path = require("path");
const ts = require("typescript");

module.exports.compile = function (fileName, content) {
  const compilerOptions = {
    target: ts.ScriptTarget.ESNext,
    strict: false,
    checkJs: false,
    allowJs: true,
    allowUnreachableCode: true,
    sourceMap: false,
    suppressExcessPropertyErrors: true,
    suppressOutputPathCheck: true,
    allowNonTsExtensions: true,
    noEmitOnError: false,
    noEmit: false,
    emitDeclarationOnly: false,
  };

  const sourceFile = ts.createSourceFile(fileName, content, {
    languageVersion: ts.ScriptTarget.ESNext,
    impliedNodeFormat: ts.ModuleKind.ESNext,
  });
  let finalContent = "";
  const host = {
    getSourceFile: (file) => {
      if (pathNormalize(file) === pathNormalize(fileName)) {
        return sourceFile;
      }
      return undefined;
    },
    writeFile: (name, text) => {
      finalContent = text;
    },
    getDefaultLibFileName: () => "lib.d.ts",
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
    fileExists: (file) => {
      if (pathNormalize(file) === pathNormalize(fileName)) {
        return true;
      }
      return false;
    },
    readFile: (file) => {
      return "";
    },
    directoryExists: () => true,
    getDirectories: () => [],
  };

  const program = ts.createProgram({
    rootNames: [fileName],
    options: compilerOptions,
    host,
  });

  const result = program.emit(undefined, undefined, undefined, undefined, {
    before: [createStringConstantReplacementTransformer()],
  });
  if (result.emitSkipped) {
    throw new Error("TS skipped emit for " + fileName);
  }

  return finalContent;
};

function createStringConstantReplacementTransformer() {
  return (ctx) => {
    return (sourceFile) => {
      function visitor(node) {
        return ts.visitEachChild(node, visitor, ctx);
      }

      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
}

function pathNormalize(p) {
  return path.normalize(p).replace(/\\/g, "/");
}
