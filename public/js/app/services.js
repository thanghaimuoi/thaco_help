const url = "http://localhost:3000";

const Service = {
    request : async function(url, method = 'GET', data = null, outString = false) {
        let dataStr = !data ? '' : JSON.stringify(data);
        let option = {
            method,
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (method != 'GET') {
            option.body = dataStr;
        }
        let response = await fetch(url, option);
        if (method == 'DELETE') {
            return null;
        }
        if (outString) {
            return await response.text();
        }
        let result = await response.json();
        return result;
    },

    add : async function(data) {
        let res = await this.request(url + "/api/category/add", 'PUT', data);
        return res;
    },

    getChilds: async function(parentId) {
        let tree =  await this.request(url + `/api/category/childs?parentId=${parentId}`);
        return tree;
    },

    delete: async function(id) {
        let res = await this.request(url + `/api/category/delete/${id}`, 'DELETE');
        return res;
    },

    update: async function(data) {
        let res = await this.request(url + "/api/category/update", 'POST', data);
        return res;
    },

    getFileContent: async function(id) {
        let res = await this.request(url + `/api/category/file-content/${id}`, 'GET', null, true);
        return res;
    }
}