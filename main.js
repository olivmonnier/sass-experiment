function checkCssUnused() {
  const listCssUsed = getCssUsed();

  const clsUnused = listCssUsed
    .map(layer => Object.values(layer)[0])
    .flat()
    .filter(c => document.querySelectorAll(`.${c}`).length === 0);

  if (clsUnused.length > 0) {
    console.warn('Unused classes list: ');
    console.table(clsUnused);
  }
}

function getCssUsed() {
  const clsUsed = getComputedStyle(document.documentElement)
    .getPropertyValue('--cls-used')
    .replace(/(^\(|\)$)/g, '');

  return clsUsed.split(', ')
    .map(layer => layer.split(': '))
    .map(([layer, deps]) => ({ [layer]: deps.replace(/"/g, '').split(' ') }));
}