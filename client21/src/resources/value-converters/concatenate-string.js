export class ConcatenateStringValueConverter {
    toView(value, length) {
        return value ? value.substring(0, length) + '...' : '';
    }
}