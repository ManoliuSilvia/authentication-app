import {Backdrop, Box, Button, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};

export default function ConfirmationModal({children, open, setOpen}){
    return (
        <Modal
            open={open}
            sx={{bgcolor:'transparent'}}
            onClose={()=> setOpen(false)}
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(18, 46, 92, 0.2)',
                    },
                },
            }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete this user?
                </Typography>
                <Button onClick={()=>setOpen(false)}>Close</Button>
                {children}
            </Box>
        </Modal>
    )
}