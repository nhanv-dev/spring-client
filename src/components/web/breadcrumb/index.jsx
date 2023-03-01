import React from 'react';
import {Box} from "@mui/material";

function Breadcrumb({children}) {
    return (
        <Box className="py-4 flex items-center justify-start gap-0 text-tiny font-medium max-w-full overflow-hidden"
             sx={{
                 '& a': {
                     color: "#1a9cb7",
                     minWidth: 'max-content',
                     paddingRight: "12px",
                     marginRight: "12px",
                     position: 'relative',
                     ':after': {
                         position: 'absolute',
                         content: '"/"',
                         left: '100%',
                         top: '50%',
                         transform: 'translate(-50%,-50%)',
                         color: '#787878',
                         opacity: '.7',
                     }
                 },
                 '& p': {
                     color: '#787878'
                 }
             }}>
            {children}
        </Box>
    );
}

export default Breadcrumb;