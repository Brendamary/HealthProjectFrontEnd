import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
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