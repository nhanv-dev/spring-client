import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import StarRating from "../../common/star-rating";

function FilterColor({handleFilter}) {
    const [checked, setChecked] = React.useState({});
    const [ratings, setRatings] = useState([
        {id: 1, value: 5},
        {id: 2, value: 4},
        {id: 3, value: 3},
        {id: 4, value: 2},
        {id: 5, value: 1},
    ]);

    return (
        <div className="border-b border-border">
            <h5 className="pt-4 px-3 pb-2 text-tiny font-semibold text-black-1">
                Đánh giá
            </h5>
            <div className="px-3 pb-3">
                <FormGroup>
                    {ratings.map((rating, index) => (
                        <FormControlLabel key={index} label={<StarRating rating={rating.value} className="w-[15px]"/>}
                                          control={
                                              <Checkbox
                                                  size="small"
                                                  checked={checked?.id === rating.id}
                                                  onChange={() => {
                                                      setChecked(rating)
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