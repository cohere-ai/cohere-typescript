function importTest(name: string, path: string) {
  describe(name, function () {
    require(path);
  });
}

describe('The baseline-shrimp model', () => {
  importTest("generate", "./generate.ts")
  importTest("similarity", "./similarity.ts")
  importTest("choose-best", "./choose-best.ts")
  importTest("embed", "./embed.ts")
});
