export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/nav-bar'),
    PLATFORM.moduleName('./elements/side-bar'),
    PLATFORM.moduleName('./elements/top-bar'),
    PLATFORM.moduleName('./elements/flat-picker'),
    PLATFORM.moduleName('./elements/documents'),

    PLATFORM.moduleName('./editor/editor'),

    PLATFORM.moduleName('./value-converters/lookup-value'),
    PLATFORM.moduleName('./value-converters/phone-number'),
    PLATFORM.moduleName('./value-converters/activate-button'),
    PLATFORM.moduleName('./value-converters/date-format'),
    PLATFORM.moduleName('./value-converters/session-status-button'),
    PLATFORM.moduleName('./value-converters/translate-status'),
    PLATFORM.moduleName('./value-converters/system-list'),
    PLATFORM.moduleName('./value-converters/concatenate-string'),
    PLATFORM.moduleName('./value-converters/remove-spaces'),
    PLATFORM.moduleName('./value-converters/document-icons')  
  ]);
}
