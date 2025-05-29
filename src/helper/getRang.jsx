export function getRang(position) {
    if (position == 1) {
        return "first_place";
    } else if (position == 2) {
        return "second_place";
    } else if (position == 3) {
        return "third_place";
    } else if (position == 4) {
        return "forth_place";
    } else if (position == 5) {
        return "fifth_place";
    } else if (position > 5 && position < 11) {
        return "fisrt_ten_place";
    } else {
        return "other_place";
    }
}