function previewAnnotations(entry = []) {
  return [...entry, require.resolve("../dist/esm/preview")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("../dist/esm/manager")];
}

module.exports = {
  managerEntries,
  previewAnnotations,
};
