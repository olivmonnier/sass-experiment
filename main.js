function checkCssUnused() {
  const listCssUsed = getCssUsed();

  return listCssUsed
    .map(({ layer, dependencies }) => ({
      layer,
      dependencies: dependencies
        .filter(dep => document.querySelectorAll(`.${dep}`).length === 0)
    }))
    .filter(({dependencies}) => dependencies.length > 0);
}

function getCssUsed() {
  const clsUsed = getComputedStyle(document.documentElement)
    .getPropertyValue('--cls-used')
    .replace(/(^ \(|\)$)/g, '');

  return clsUsed.split(', ')
    .map(layer => layer.split(': '))
    .map(([layer, deps]) => ({ layer, dependencies: deps.replace(/"/g, '').split(' ')}))
}

function showClassesUnused(cls) {
  console.warn('Unused classes list: ');
  console.table(cls.map(({ layer, dependencies }) => 
    ({ layer, dependencies: dependencies.join(', ') })),
    ["layer", "dependencies"]
  );
}