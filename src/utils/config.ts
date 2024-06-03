// Interface represents a module in MFE
interface ModuleLoader {
  key: string; // Name of module
  loader: () => Promise<any>; // Loader function to load the module
}

// Interface represents the structure of the MFE application
export interface MFEAppLoader {
  app_name: string; // Name of the application
  modules: ModuleLoader[]; // List of modules to load
  meta_data: [],
}
