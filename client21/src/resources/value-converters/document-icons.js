export class DocumentIconsValueConverter {
    toView(value) {
        if(!value) return;

        if(value.curriculum) return 'fa fa-window-restore';
        if(value.downloads) return 'fa fa-download' ;
        return 'fa fa-file-text-o';
    }
}