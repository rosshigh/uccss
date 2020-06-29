export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/nav-bar'),
    PLATFORM.moduleName('./elements/side-bar'),
    PLATFORM.moduleName('./elements/top-bar'),
    PLATFORM.moduleName('./elements/flat-picker'),

    PLATFORM.moduleName('./value-converters/lookup-value'),
    PLATFORM.moduleName('./value-converters/phone-number'),
    PLATFORM.moduleName('./value-converters/activate-button'),
    PLATFORM.moduleName('./value-converters/date-format')
  ]);
}
