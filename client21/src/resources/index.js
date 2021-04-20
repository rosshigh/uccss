export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/nav-bar'),
    PLATFORM.moduleName('./elements/side-bar'),
    PLATFORM.moduleName('./elements/top-bar'),
    PLATFORM.moduleName('./elements/flat-picker'),

    PLATFORM.moduleName('./editor/editor'),

    PLATFORM.moduleName('./value-converters/lookup-value'),
    PLATFORM.moduleName('./value-converters/onoff-switch'),
    PLATFORM.moduleName('./value-converters/phone-number'),
    PLATFORM.moduleName('./value-converters/activate-button'),
    PLATFORM.moduleName('./value-converters/date-format'),
    PLATFORM.moduleName('./value-converters/session-status-button'),
    PLATFORM.moduleName('./value-converters/translate-status'),
    PLATFORM.moduleName('./value-converters/system-list'),
    PLATFORM.moduleName('./value-converters/concatenate-string'),
    PLATFORM.moduleName('./value-converters/remove-spaces'),
    PLATFORM.moduleName('./value-converters/document-icons'),  
    PLATFORM.moduleName('./value-converters/sort-array'),
    PLATFORM.moduleName('./value-converters/help-ticket-category'),
    PLATFORM.moduleName('./value-converters/session'),
    PLATFORM.moduleName('./value-converters/file-name-checked'),
    PLATFORM.moduleName('./value-converters/convert-course-names'),
    PLATFORM.moduleName('./value-converters/gravatar-url'),
    PLATFORM.moduleName('./value-converters/sort-date-time'),
    PLATFORM.moduleName('./value-converters/file-type'),
    PLATFORM.moduleName('./value-converters/get-array-value'),
    PLATFORM.moduleName('./value-converters/idsRequested'),
    PLATFORM.moduleName('./value-converters/filter-clients'),
    PLATFORM.moduleName('./value-converters/parse-assignments'),
    PLATFORM.moduleName('./value-converters/info-filter'),
    PLATFORM.moduleName('./value-converters/session-type'),
    PLATFORM.moduleName('./value-converters/filter-statuses'),
    PLATFORM.moduleName('./value-converters/help-ticket-type')
  ]);
}
