import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

function FilterMaterial({handleFilter}) {
    const [checked, setChecked] = React.useState({});
    const [materials, setMaterials] = useState([
        {id: 1, name: "Nỉ"},
        {id: 2, name: "Cotton"},
        {id: 3, name: "Lụa"},
        {id: 4, name: "Kaki"},
        {id: 5, name: "Spandex"},
        {id: 6, name: "Len"},
        {id: 7, name: "Ren"},
        {id: 8, name: "Jeans"},
        {id: 9, name: "Khác"},
    ]);

    return (
        <div className="border-b border-border">
            <h5 className="pt-4 px-3 pb-2 text-tiny font-semibold text-black-1">
                Chất liệu
            </h5>
            <div className="px-3 pb-3">
                <FormGroup>
                    {materials.map((material, index) => (
                        <FormControlLabel key={index} label={material.name}
                                          control={
                                              <Checkbox
                                                  size="small"
                                                  checked={checked?.id === material.id}
                                                  onChange={() => {
                                                      setChecked(material)
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

export default FilterMaterial;