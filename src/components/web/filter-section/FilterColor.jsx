import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

function FilterColor({handleFilter}) {
    const [checked, setChecked] = React.useState({});
    const [colors, setColors] = useState([
        {id: 1, name: "Xám"},
        {id: 2, name: "Đen"},
        {id: 3, name: "Trắng"},
        {id: 4, name: "Xanh"},
        {id: 5, name: "Hồng"},
        {id: 6, name: "Đỏ"},
        {id: 7, name: "Kem"},
        {id: 8, name: "Xanh dương"},
        {id: 9, name: "Vàng"},
        {id: 10, name: "Xanh lá"},
        {id: 11, name: "Tím"},
        {id: 12, name: "Nâu"},
        {id: 13, name: "Cam"},
        {id: 14, name: "Bạc"},
    ]);

    return (
        <div className="border-b border-border">
            <h5 className="pt-4 px-3 pb-2 text-tiny font-semibold text-black-1">
                Màu sắc
            </h5>
            <div className="px-3 pb-3">
                <FormGroup>
                    {colors.map((color, index) => (
                        <FormControlLabel key={index} label={color.name}
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