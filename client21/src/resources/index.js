export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/nav-bar'),
    PLATFORM.moduleName('./value-converters/lookup-value'),
    PLATFORM.moduleName('./value-converters/phone-number'),
    PLATFORM.moduleName('./elements/side-bar'),
    PLATFORM.moduleName('./elements/top-bar')
  ]);
}
