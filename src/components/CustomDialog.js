import React from 'react';
import { DialogActions } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { FaBold } from 'react-icons/fa';

function CustomDialog({Title, Message, DialogStatus}) {

    return (
        <div>
                <Dialog open={true}>
                    <DialogTitle style={{color: "#191970", fontSize: 18, textDecoration: "bold"}}>
                        {Title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{color: "#000", fontSize: 12}}>
                            {Message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{backgroundColor: "#191970", color: "#ffffff", fontSize: 14, paddingLeft: 0, paddingRight: 15}} onClick={() => DialogStatus(false)} >OK</Button>
                    </DialogActions>
                </Dialog>
            </div>


    );

}

export default CustomDialog