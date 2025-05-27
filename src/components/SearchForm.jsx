import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { makeStyles } from "@mui/material";

export default function SearchForm({ years, year, text, setYear, setText }) {
    console.log("year ", year, years);
    const location = useLocation("");
    const params = useParams();

    const showSearch = () => {
        if (location.pathname === "/drivers" ||
            location.pathname === "/teams" ||
            location.pathname === "/races" ||
            location.pathname === `/drivers/:${params.id}` ||
            location.pathname === `/teams/:${params.id}` ||
            location.pathname === `/races/:${params.id}` 
        ) {
            return { visibility: "visible" };
        } else {
            return { visibility: "hidden" };
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
                    InputLabelProps={{ style: { color: "red", fontWeight: "bold", padding: "3px" } }}
                    sx={{
                        backgroundColor: "white;", width: 210, height: 50, borderRadius: "5px", display: "flex", alignItems: "center",
                        "& .MuiOutlinedInput-nothcedOutline": {
                            border: "1px red solid",
                        },
                        "& .MuiOutlinedInput-root": {
                            border: "3px black solid",
                            borderRadius: "5px",
                            // "& .MuiInputBase-input": {
                            //     border: "1px white solid",
                            // }
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
                                //backgroundColor: "#e94545;",
                                color: "white",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "red",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "black",
                                },
                            }}
                            MenuProps={{
                                PapperProps: {
                                    sx: {
                                        backgroundColor: "#f5f5f5",
                                        marginTop: "5px",
                                        maxHeight: 200,
                                        "& .MuiMenuItem-root": {
                                            "&:hover": {
                                                backgroundColor: "red",
                                                color: "#fff"
                                            },
                                            "&:Mui-selected": {
                                                backgroundColor: "d0d0d0",
                                                "&:hover": {
                                                    backgroundColor: "red",
                                                },
                                            },
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
                                    <MenuItem value={year}>{year}</MenuItem>
                                )
                            })}
                        </Select>}
                    </FormControl>
                </Box>
            </li>
        </ul>
    )
}