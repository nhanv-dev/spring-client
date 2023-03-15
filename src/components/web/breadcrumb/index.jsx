import React from 'react';
import {Box} from "@mui/material";

function Breadcrumb({children}) {
    return (
        <Box className="py-5 flex items-center justify-start gap-0 text-tiny font-medium max-w-full overflow-hidden"
             sx={{
                 '& a': {
                     color: "#3f4b53",
                     minWidth: 'max-content',
                     paddingRight: "12px",
                     marginRight: "12px",
                     position: 'relative',
                     ':hover': {
                         color: "#0a68ff"
                     },
                     ':after': {
                         position: 'absolute',
                         content: '"/"',
                         left: '100%',
                         top: '50%',
                         transform: 'translate(-50%,-50%)',
                         color: '#3f4b53',
                     }
                 },
                 '& p': {
                     color: '#3f4b53',
                     userSelect: 'none',
                 }
             }}>
            {children}
        </Box>
    );
}

export default Breadcrumb;