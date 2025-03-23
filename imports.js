//imports

import 'ag-grid-community/styles/ag-grid.css';
import { createGrid, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


//exports
export { createGrid};


