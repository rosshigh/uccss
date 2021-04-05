export class HelpTicketCategoryValueConverter {
    toView(value, category, categories) {
        let selectedIndex = 0;
        categories.forEach((item, index) => {
            if(item.category == category) selectedIndex = index;
        })
        return categories[selectedIndex].subtypes;
    }
}