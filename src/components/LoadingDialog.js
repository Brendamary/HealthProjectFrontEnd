import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { FaBold } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

function LoadingDialog() {

    return (
        <div style={{width: "20%"}}>
                <Dialog open={true}>
                    <DialogTitle style={{color: "#191970", fontSize: 18, textDecoration: "bold"}}>
                        Loading
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{color: "#000", fontSize: 12}}>
                              <ClipLoader color={'#000'} size={50} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </div>


    );

}

export default LoadingDialog