//imports

// Access ag-grid-community APIs from the global agGrid object
const { createGrid, AllCommunityModule, ModuleRegistry, themeQuartz } = window.agGrid;

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


//exports
export { createGrid, themeQuartz};


