import Box from "@mui/system/Box";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useLocation, matchPath } from "react-router";

export default function SearchForm({ years, year, text, setYear, setText }) {
    console.log("year ", year, years);
    const location = useLocation("");

    const showSearch = () => {
        if (matchPath("/drivers", location.pathname) ||
            matchPath("/teams", location.pathname) ||
            matchPath("/races", location.pathname) ||
            matchPath(`/drivers/:id`, location.pathname) ||
            matchPath(`/teams/:id`, location.pathname) ||
            matchPath(`/races/:id`, location.pathname)
        ) {
            return { visibility: "visible" };
        } else {
            return { display: "none" };
        }
    };

    const handleChangeText = (event) => {
        setText(event.target.value);
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    return (
        <ul className="search_nav" style={showSearch()}>
            <li>
                <TextField
                    id="outlined-basic"
                    value={text}
                    onChange={handleChangeText}
                    variant="outlined"
                    className="text_field"
                    label="Search for..."
                    InputLabelProps={{
                        style: {
                            color: "grey",
                            padding: "5px",
                            bgcolor: "white",
                            display: "flex",
                            alignItems: "center"
                        }
                    }}
                    sx={{
                        backgroundColor: "white;",
                        width: 210,
                        height: 50,
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        "& .MuiOutlinedInput-nothcedOutline": {
                            border: "1px red solid",
                        },
                        "& .MuiOutlinedInput-root": {
                            border: "3px black solid",
                            borderRadius: "5px",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        },

                    }
                    }
                />
            </li>
            <li>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl>
                        <InputLabel id="simple-select-label" sx={{ color: "white" }}>Select a year</InputLabel>
                        {years.length > 0 && <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={year}
                            label="Filter By Year"
                            onChange={handleChangeYear}
                            sx={{
                                minWidth: 140,
                                color: "white",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "red",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor: "white",
                                },
                                "&.MuiInputLabel-shrink:active": {
                                    color: "black"
                                },
                            }}
                            MenuProps={{
                                PapperProps: {
                                    sx: {
                                        borderRadius: '5px',
                                        "& .MuiMenuItem-root": {
                                            "MuiSvgIcon-root": {
                                                color: "white",
                                                backgroundColor: "white"
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {years.map((year) => {
                                return (
                                    <MenuItem value={year}
                                        sx={{
                                            "&:hover": {
                                                color: "white",
                                                bgcolor: "black",
                                            },
                                            "&:selected": {
                                                color: "white",
                                                bgcolor: "black",
                                            },
                                            "& .Mui-selected": {
                                                color: "white",
                                                bgcolor: "black",
                                            },
                                            "& .MuiMenuItem-root": {
                                                backgroundColor: "red",
                                                "&:active": {
                                                    backgroundColor: "red",
                                                }
                                            },
                                        }}>{year}</MenuItem>
                                )
                            })}
                        </Select>}
                    </FormControl>
                </Box>
            </li>
        </ul>
    )
}