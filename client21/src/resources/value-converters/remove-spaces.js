export class RemoveSpacesValueConverter {
	toView(value) {
        if(value){
            return value.split(" ").join(""); 
        }
    }
}