import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { color, maxHeight } from "@mui/system";

export default function SearchForm({ years, year, text, setYear, setText }) {
    console.log("year ", year, years);

    const handleChangeText = (event) => {
        setText(event.target.value);
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    return (
        <ul className="search_nav">
            <li>
                <TextField
                    id="outlined-basic"
                    value={text}
                    onChange={handleChangeText}
                    variant="outlined"
                    className="text_field"
                    label="Search for..."
                    sx={{backgroundColor: "white;", color: "white", width: 210, height: 50}}
                />
            </li>
            <li>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>Select a year</InputLabel>
                        {years.length > 0 && <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year}
                            label="Filter By Year"
                            onChange={handleChangeYear}
                            sx={{
                                minWidth: 140,
                                //backgroundColor: "#e94545;",
                                color: "white",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
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