//view root
fetch('/api/category/root')
.then((res) => res.json())
.then((data) => {
    let tree = $("#tree>ul");
    addNodeView(tree, data);
    loadNodeChild(tree.find(">li"));
})

let editor = null;
ClassicEditor
    .create(document.querySelector('#editor'))
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

async function changeNameComplete(thiss = null) {
    let $parent = null;
    if (!thiss) {
        thiss = event.target;
    }
    $parent = $(thiss).parent();
    let $span = $parent.find(">span");
    let $input = $parent.find(">input");
    let data = {
        _id: $parent.attr("data-id"),
        name: $input.val()
    }
    data = await Service.update(data);

    let $changeName = $parent.find(">.change-name-complete");
    let $editName = $parent.find(">.edit-name");

    $span.css({ display: "inline" });
    $span.text($input.val());
    $input.css({ display: "none" });
    $changeName.css({ display: "none" });
    $editName.css({ display: "inline" });
}


async function addNode(isFile = false) {
    let $parent = $(event.target).parent();

    let name = prompt("Nhập tên " + (isFile? "tệp tin" : "thư mục"));
    if(!name) {
        return;
    }
    let newdata = {
        name,
        isFile,
        parentCategory: $parent.attr('data-id'),
    }
    data = await Service.add(newdata);

    loadNodeChild($parent);
}

function editName(thiss = null) {
    let $parent = null;
    if (!thiss) {
        thiss = event.target;
    }
    $parent = $(thiss).parent();
    let $span = $parent.find(">span");
    let $input = $parent.find(">input");
    let $changeName = $parent.find(">.change-name-complete");
    let $editName = $parent.find(">.edit-name");

    $span.css({ display: "none" });
    $input.val($span.text());
    $input.css({ display: "inline" });
    $changeName.css({ display: "inline" });
    $editName.css({ display: "none" });
}

async function nodeClick() {
    let $liParent = $(event.target).parent();
    if ($liParent.attr("isFile")) {
        let id = $liParent.attr("data-id");
        $("#editor-container").css("display", "block");
        $("#file-id").val(id);
        let fileContent = await Service.getFileContent(id);
        editor.setData(fileContent);
        return;
    }
    $("#editor-container").css("display", "none");
    let $ul = $(event.target).parent().find(">ul");
    if ($ul.length == 0) {
        loadNodeChild($liParent)
    }
    let isExpand = $ul.css("display") != "none";
    if (!isExpand) {
        $ul.css("display", "block");
        $liParent.find(">.icon").removeClass("fa-folder").addClass("fa-folder-open");
    } else {
        $ul.css("display", "none");
        $liParent.find(">.icon").removeClass("fa-folder-open").addClass("fa-folder");
    }
}

async function loadNodeChild($parent) {
    let $ul = $parent.find(">ul");
    if ($ul.length == 0) {
        $parent.append('<ul class="list-group"></ul>');
    }
    $ul = $parent.find(">ul");
    $ul.html('');
    $ul.css('display', 'block');
    let parentId = $parent.attr('data-id');
    let childs = await Service.getChilds(parentId);
    if (childs.length == 0) {
        return;
    }
    for (let child of childs) {
        addNodeView($ul, child);
    }
    $parent.find(">.icon").removeClass("fa-folder").addClass("fa-folder-open");
}

function addNodeView($ul, data) {
    let $dirClone = $("#clone-dir-node").clone();
    $dirClone.attr("id", "");
    $dirClone.css({ display: "block" });
    $ul.append($dirClone);

    let $span = $dirClone.find(">span.name");
    let $input = $dirClone.find(">input.name");
    $dirClone.attr('data-id', data._id);
    if (data.isFile) {
        $dirClone.attr('isFile', data.isFile);
        let $icon = $dirClone.find(">.icon");
        $icon.removeClass("fa-folder").addClass("fa-file");
        $dirClone.find(">.add-file").remove();
        $dirClone.find(">.add-folder").remove();
    }
    $span.text(data.name);
    $input.val(data.name);
    $input.css("display", "none");
    $span.css("display", "inline");
    $dirClone.find(">.change-name-complete").css("display", "none");
}

async function deleteNode() {
    var answer = window.confirm("Bạn chắc chắn muốn xóa?");
    if (!answer) {
        return;
    }
    let $parent = $(event.target).parent();
    let id = $parent.attr('data-id');
    await Service.delete(id);
    let $liParent = $parent.parent().parent();
    $parent.parent().remove();
    await loadNodeChild($liParent);
}

function saveContent() {
    var content = editor.getData();
    var id = $("#file-id").val();
    let data = {
        _id: id,
        document: content
    };
    Service.update(data).then(() => {
        console.log("save complete!");
        alert("Đã lưu");
    });
}