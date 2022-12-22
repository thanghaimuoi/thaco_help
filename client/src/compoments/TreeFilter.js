import React, { Component } from 'react';
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import TextField from '@mui/material/TextField';

var tree = {
    name: 'root',
    _id: 1,
    child: [
    {
        name: "Windows",
        _id: 2,
        child: [
            {
                name: "Windows 7",
                _id: 3
            },
            {
                name: "Windows 8",
                _id: 4
            },
            {
                name: "Windows 10",
                _id: 5
            },
            {
                name: "Windows 11",
                _id: 6
            }
        ]
    },
    {
        name: "Linux",
        _id: 7,
        child: [
            {
                name: "Ubuntu",
                _id: 8
            },
            {
                name: "Fedora",
                _id: 9
            },
            {
                name: "Android",
                _id: 10
            },
        ]
    }
]};

class TreeViewFilter extends Component {
    constructor(props) {
        super(props);
        // flat tree
        this.tree = [];
        this.flatTree(tree);

        this.filterTree = null;
    }

    state = {
        keyword: '',
        struct: tree
    }

    flatTree(node, parentIndex = -1, cap = 0) {
        let cloneNode = {name: node.name, _id : node._id, index : this.tree.length, parentIndex, cap}
        this.tree.push(cloneNode);
        if (!node.child) return;
        for (let childNode of node.child) {
            this.flatTree(childNode, cloneNode.index, cap + 1);
        }
    }

    doFilterTree(keyword) {
        if (!this.tree) return;
        this.inFilterTree = [0];
        this.filterTree = this.tree[0];
        this.tree[0].child = [];
        for (let node of this.tree) {
            if (node.name.toLowerCase().includes(keyword.toLowerCase())) {
                this.buildTree(node);
            }
        }
        this.setState({struct: this.filterTree})
    }

    buildTree(node) {
        node.child = [];
        let current = node;
        let parent = null;
        for (let cap = node.cap; cap > 0; cap--) {
            parent = this.tree[current.parentIndex];
            if (!this.inFilterTree.includes(parent.index)) {
                parent.child = [];
                this.inFilterTree.push(parent.index);
            }
            if (!parent.child.includes(current)) {
                parent.child.push(current);
            }
            current = parent;
        }
        this.inFilterTree.push(node.index);
    }
    
    renderTree(root) {
        let id = root._id + "";
        return(
        <TreeItem key={root._id} nodeId={id} label={root.name} isFolder={root.isFolder}>
            {root.child ? root.child.map((childT) => this.renderTree(childT)) : ""}
        </TreeItem>);
    }
    
    render() {
        return (
            <>
            <TextField
                label="Tìm kiếm"
                variant="outlined"
                onChange={(ev) => {this.doFilterTree(ev.target.value);}} />
            <Divider />
            <TreeView
                aria-label="file system navigator"
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