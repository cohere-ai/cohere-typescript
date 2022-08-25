function importTest(name: string, path: string) {
  describe(name, function () {
    require(path);
  });
}

describe("The `small` model", () => {
  importTest("generate", "./generate.ts");
  importTest("embed", "./embed.ts");
  importTest("classify", "./classify.ts");
  importTest("extract", "./extract.ts");
  importTest("tokenize", "./tokenize.ts");
});
