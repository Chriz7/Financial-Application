//imports

import { createGrid, AllCommunityModule, ModuleRegistry, themeQuartz} from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


//exports
export { createGrid, themeQuartz};


