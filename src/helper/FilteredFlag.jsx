export function filteredFlagNationality(flags, nationality) {
    if (!flags) {
        return null;
    }
    if (nationality === "Dutch") {
        return "NL";
    }
    if (nationality === "Korean") {
        return "KR";
    }
    if (nationality === "British") {
        return "GB";
    }
    if (nationality === "Monegasque") {
        return "MC";
    }
    if (nationality === "New Zealander") {
        return "NZ";
    }
    if (nationality === "Argentinian ") {
        return "AR";
    }

    const flag = flags.find((flag) => flag.nationality === nationality);
    if (!flag) {
        return null;
    }
    return flag.alpha_2_code;
}

export function filteredFlagCountry(flags, name) {
    //console.log("name", name);

    if (!flags) {
        return null;
    }

    if (name === "Korea") return "KR";

    if (name === "UK") {
        return "GB";
    }
    if (name === "USA") {
        return "US";
    }
    if (name === "UAE") return "AE";
    if (name === "Russia") return "RU";
    if (name === "Azerbaijan") return "AZ";
    if (name === "United States") return "US";

    const country = flags.find((flag) => flag.en_short_name === name);

    if (!country) {
        return null;
    }
    return country.alpha_2_code;
}