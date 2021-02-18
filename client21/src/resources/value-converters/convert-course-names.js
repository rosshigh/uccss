export class ConvertCourseNamesValueConverter {
    toView(value, array) {
        if(!array) return null;
        let course = 'Trial Client';
        for(let i = 0; i < array.length; i++){
            if(value === array[i].courseId){
                course = array[i].courseNumber + " - " + array[i].courseName;
            }
        }
        return course;
    }
}