import React, { Component } from 'react';
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded'
import TreeView from '@mui/lab/TreeView'
import TextField from '@mui/material/TextField';
import Service from '../../services/service';
import CustomTreeItem from './CustomTreeItem';

class TreeViewFilter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Service.getTree().then((struct) => {
            this.tree = [];
            this.flatTree(struct);

            this.filterTree = null;
            this.setState({struct});
        });
    }

    state = {
        keyword: '',
        struct: {},
        expanded: []
    }

    flatTree(node, parentIndex = -1, cap = 0) {
        let cloneNode = {name: node.name, _id : node._id, isFile: node.isFile, index : this.tree.length, parentIndex, cap}
        this.tree.push(cloneNode);
        if (!node.childs) return;
        for (let childNode of node.childs) {
            this.flatTree(childNode, cloneNode.index, cap + 1);
        }
    }

    doFilterTree(keyword) {
        if (!this.tree) return;
        let expanded = [];
        this.inFilterTree = [0];
        this.filterTree = this.tree[0];
        this.tree[0].childs = [];
        for (let node of this.tree) {
            if (node.name.toLowerCase().includes(keyword.toLowerCase())) {
                this.buildTree(node);
            }
        }
        if (!keyword) {
            expanded = [];
        } else {
            for (let filterIndex of this.inFilterTree) {
                let treeItem = this.tree[filterIndex];
                let id = (treeItem.isFile ? "0" : "1") + "_" + treeItem._id + "";
                expanded.push(id);
            }
        }
        this.setState({struct: this.filterTree, expanded});
    }

    buildTree(node) {
        node.childs = [];
        let current = node;
        let parent = null;
        for (let cap = node.cap; cap > 0; cap--) {
            parent = this.tree[current.parentIndex];
            if (!this.inFilterTree.includes(parent.index)) {
                parent.childs = [];
                this.inFilterTree.push(parent.index);
            }
            if (!parent.childs.includes(current)) {
                parent.childs.push(current);
            }
            current = parent;
        }
        this.inFilterTree.push(node.index);
    }
    
    renderTree(root) {
        let id = (root.isFile ? "0" : "1") + "_" + root._id + "";
        return(
            <CustomTreeItem key={root._id} nodeId={id} label={root.name} isFolder={!root.isFile}>
                {root.childs ? root.childs.map((childT) => this.renderTree(childT)) : ""}
            </CustomTreeItem>);
    }

    onSelected = (ev, id) => {
        if (!this.state.expanded.includes(id)) {
            this.state.expanded.push(id);
        } else {
            const index = this.state.expanded.indexOf(id);
            if (index > -1) {
                this.state.expanded.splice(index, 1);
            }
        }
        
        let id_info = id.split('_');
        if (id_info[0] === "0") {
            Service.getFileContent(id_info[1]).then((content) => {
                this.props.onSelectedIndex(content);
            });
        }
        
        this.setState({expanded: this.state.expanded});
    }
    
    render() {
        return (
            <>
            <TextField
                sx={{margin: "0.5rem"}}
                size='small'
                label="Tìm kiếm"
                variant="outlined"
                onChange={(ev) => {this.doFilterTree(ev.target.value);}} />
            <Divider />
            <TreeView
                expanded={this.state.expanded}
                onNodeSelect={this.onSelected}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                {this.renderTree(this.state.struct)}
            </TreeView>
            </>
        );
    }
}
 
export default TreeViewFilter;