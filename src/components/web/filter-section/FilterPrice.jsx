import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

function FilterColor({handleFilter}) {
    const [checked, setChecked] = React.useState({});
    const [prices, setPrices] = useState([
        {id: 1, label: "Dưới 100.000đ"},
        {id: 2, label: "100.000đ - 250.000đ"},
        {id: 3, label: "250.000đ - 1.050.000đ"},
        {id: 4, label: "Trên 1.050.000đ"},
    ]);

    return (
        <div className="border-b border-border">
            <h5 className="pt-4 px-3 pb-2 text-tiny font-semibold text-black-1">
                Giá
            </h5>
            <div className="px-3 pb-3">
                <FormGroup>
                    {prices.map((price, index) => (
                        <FormControlLabel key={index} label={price.label}
                                          control={
                                              <Checkbox
                                                  size="small"
                                                  checked={checked?.id === price.id}
                                                  onChange={() => {
                                                      setChecked(price)
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