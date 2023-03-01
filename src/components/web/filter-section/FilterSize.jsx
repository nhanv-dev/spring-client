import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

function FilterColor({handleFilter}) {
    const [checked, setChecked] = React.useState({});
    const [colors, setColors] = useState([
        {id: 1, color: "S"},
        {id: 2, color: "L"},
        {id: 3, color: "M"},
        {id: 4, color: "XL"},
        {id: 5, color: "XS"},
        {id: 6, color: "XXl"},
        {id: 7, color: "3Xl"},
        {id: 8, color: "4Xl"},
        {id: 9, color: "5Xl"},
        {id: 10, color: "6Xl"},
        {id: 11, color: "Free size"},
    ]);

    return (
        <div className="border-b border-border">
            <h5 className="pt-4 px-3 pb-2 text-tiny font-semibold text-black-1">
                Kích thước
            </h5>
            <div className="px-3 pb-3">
                <FormGroup>
                    {colors.map((color, index) => (
                        <FormControlLabel key={index} label={color.color}
                                          control={
                                              <Checkbox
                                                  size="small"
                                                  checked={checked?.id === color.id}
                                                  onChange={() => {
                                                      setChecked(color)
                                                  }}
                                                  inputProps={{'aria-label': 'controlled'}}
                                                  sx={{'&.Mui-checked': {color: "#0a68ff"}}}
                                              />}
                                          sx={{
                                              '& .MuiFormControlLabel-label': {
                                                  fontWeight: "500",
                                                  color: '#38383d',
                                                  fontSize: '0.8rem',
                                                  paddingLeft: "6px"
                                              },
                                              '& .PrivateSwitchBase-root': {padding: "6px", marginLeft: "3px"},
                                          }}
                        />
                    ))}
                </FormGroup>
            </div>
        </div>
    );
}

export default FilterColor;