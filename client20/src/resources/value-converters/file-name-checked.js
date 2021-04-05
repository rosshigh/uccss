export class FileNameCheckedValueConverter {
    toView(value, array) {
        if(!array) return false;
        let fileSelectedAlready = false;
        let pieces;
        array.forEach(item => {
            pieces = item.split("/");
            if(pieces[2] = value) fileSelectedAlready = true;
        })
        return fileSelectedAlready;
    }
}