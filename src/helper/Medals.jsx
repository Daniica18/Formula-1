export function getMedals(position) {
    if (position == 1) {
        return { backgroundColor: "yellow" };
    } else if (position == 2) {
        return { backgroundColor: "silver" };
    } else if (position == 3) {
        return { backgroundColor: "orangered" };
    }
};