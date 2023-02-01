import React, { Component } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import TreeView from '@mui/lab/TreeView';
import TreeItemEditor from './tree_editor_item';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Service from '../../services/service';
import { Typography } from '@mui/material';

class TreeEditor extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        keyword: '',
        struct: {},
        open: false,
        deleteOpen: false,
        selectedItem: {},
    }
    
    renderTree(root) {
        let id = root._id + "";
        return(
        <TreeItemEditor
            onEditClick={this.onEditItemClick} item={root}
            key={root._id} nodeId={id} label={root.name} name={root.name}
            isFolder={!root.isFile}
            onAddFileClick={this.onAddFileClick}
            onAddFolderClick={this.onAddFolderClick}
            onDeleteClick={this.onDeleteClick}
            >
            {root.childs ? root.childs.map((childT) => this.renderTree(childT)) : ""}
        </TreeItemEditor>);
    }

    openDialog(open) {
        this.setState({open})
    }

    openDeleteDialog(deleteOpen) {
        this.setState({deleteOpen})
    }

    onEditItemClick = (ev, item) => {
        ev.stopPropagation();
        const selectedItem = {...item};
        this.setState({selectedItem});
        this.openDialog(true);
    }

    onAddFolderClick = (ev, item) => {
        ev.stopPropagation();
        const selectedItem = this.createNewItem(item, false);
        this.setState({selectedItem});
        this.openDialog(true);
    }

    onAddFileClick = (ev, item) => {
        ev.stopPropagation();
        const selectedItem = this.createNewItem(item, true);
        this.setState({selectedItem});
        this.openDialog(true);
    }

    onDeleteClick = (ev, item) => {
        ev.stopPropagation();
        const selectedItem = item;
        this.setState({selectedItem});
        this.openDeleteDialog(true);
    }

    onConfirmDeleteClick = (ev) => {
        Service.delete(this.state.selectedItem._id).then((struct) => {
            this.setState({struct});
            this.openDeleteDialog(false);
        });
    }

    createNewItem = (parent, isFile = false) => {
        const newItem = {
            name: "",
            isFile,
            parentCategory: parent._id
        }
        return newItem;
    }

    onEditName = (ev) => {
        this.state.selectedItem.name = ev.target.value;
        this.setState({selectedItem: this.state.selectedItem});
    }

    onUpdateClick = (ev) => {
        if (this.state.selectedItem._id) {
            Service.update(this.state.selectedItem).then((struct) => {
                this.setState({struct});
                this.openDialog(false);
            });
        } else {
            Service.add(this.state.selectedItem).then((struct) => {
                this.setState({struct});
                this.openDialog(false);
            });
        }
    }

    componentDidMount = () => {
        Service.getCurrentUser().then((user) => {
            if (!user.isAdmin) {
                window.location.href = Service.url;
            } else {
                Service.getTree().then((struct) => {
                    this.setState({struct});
                });
            }
        }).catch(ex => {
            window.location.href = Service.url;
        });
    }

    render() {
        return (
            <>
            <Dialog open={this.state.open}>
                <DialogTitle>Nhập tên</DialogTitle>
                <DialogContent>
                    <TextField
                        value={this.state.selectedItem.name}
                        autoFocus
                        margin="dense"
                        label="Tên"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={this.onEditName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(ev) => {this.openDialog(false)}}>Đóng</Button>
                    <Button onClick={(ev) => {this.onUpdateClick()}}>Lưu</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={this.state.deleteOpen}>
                <DialogTitle>Nhập tên</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn chắc chắn muốn xóa
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(ev) => {this.openDeleteDialog(false)}}>Đóng</Button>
                    <Button onClick={(ev) => {this.onConfirmDeleteClick()}}>OK</Button>
                </DialogActions>
            </Dialog>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: '100%', flexGrow: 1, overflowY: 'auto' }}
                onNodeSelect={this.props.onItemSelected}
                >
                {this.renderTree(this.state.struct)}
            </TreeView>
            </>
        );
    }
}
 
export default TreeEditor;