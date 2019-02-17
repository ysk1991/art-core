import { cruise } from 'dependency-cruiser';
import paths from '../config/paths';
import { join } from 'path';
import chalk from 'chalk';

export const dependencyTree = (entry: string[]): string[] => {

  if (!entry.length) { return []; }

  const cruiseResult = cruise(
    entry,
    {
      outputType: 'json'
    }
  );

  const dependencies = JSON.parse(cruiseResult.modules).modules;

  const validDependencies = dependencies.filter((dependency) => {
    return dependency.coreModule !== true;
  }).map((notCoreDependency) => {
    return join(paths.appCwd, notCoreDependency.source);
  });

  console.log(chalk.green('validDependencies: '), validDependencies);

  return validDependencies;
};