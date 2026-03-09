import { defineConfig, type Options } from "tsup";
import { readFile } from "fs/promises";

type BundlerConfig = {
  bundler?: {
    nodeEntries?: string[];
    managerEntries?: string[];
    previewEntries?: string[];
  };
};

export default defineConfig(async (options) => {
  const packageJson = (await readFile("./package.json", "utf8").then(
    JSON.parse,
  )) as BundlerConfig;
  const {
    bundler: {
      managerEntries = [],
      previewEntries = [],
      nodeEntries = [],
    } = {},
  } = packageJson;

  const commonConfig: Options = {
    splitting: true,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: true,
    external: ["storybook", "react", "react-dom"],
  };

  const configs: Options[] = [];

  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      format: ["esm"],
      target: "esnext",
      platform: "browser",
    });
  }

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      dts: {
        resolve: true,
      },
      format: ["esm"],
      target: "esnext",
      platform: "browser",
    });
  }

  if (nodeEntries.length) {
    configs.push({
      ...commonConfig,
      entry: nodeEntries,
      format: ["esm"],
      target: "node20.19",
      platform: "node",
    });
  }

  return configs;
});
