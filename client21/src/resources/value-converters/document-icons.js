export class DocumentIconsValueConverter {
    toView(value) {
        let icon = 'fa fa-file-text-o';
        if(!value) return icon;
       
        switch(value.category){
            case 'CUR':
                icon = 'fa fa-window-restore';
                break;
            case 'SOF':
                icon = 'fa fa-download';
                break;
            case 'HPT':
                icon = "fa fa-medkit";
                break;
            case 'USE':
                icon = "fa fa-info-circle";
                break;
        }
        return icon;
    }
}