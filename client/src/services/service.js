const url = "http://localhost:4000";

const Service = {
    url,
    request : async function(url, method = 'GET', data = null, outString = false) {
        let mask = document.getElementById("mask");
        try {
            mask.style.display = 'block';

            let dataStr = !data ? '' : JSON.stringify(data);
            let option = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            if (method != 'GET') {
                option.body = dataStr;
            }
            let response = await fetch(url, option);
            if (response.status != 200) {
                let error = new Error(await response.text());
                error.status = response.status;
                throw error;
            }
            if (outString) {
                return await response.text();
            }
            let result = await response.json();
            return result;
        } catch (ex) {
            if (ex.status == 401) {
                window.location.href = url;
            }
            alert("Lỗi " + ex.message);
            throw ex;
        } finally {
            mask.style.display = 'none';
        }
    },

    add : async function(data) {
        let res = await this.request(url + "/api/admin/category/add", 'PUT', data);
        return res;
    },

    getChilds: async function(parentId) {
        let tree =  await this.request(url + `/api/category/childs?parentId=${parentId}`);
        return tree;
    },

    delete: async function(id) {
        let res = await this.request(url + `/api/admin/category/delete/${id}`, 'DELETE');
        return res;
    },

    update: async function(data) {
        let res = await this.request(url + "/api/admin/category/update", 'POST', data);
        return res;
    },

    getTree: async function(data) {
        let res = await this.request(url + "/api/category/tree", 'GET', data);
        return res;
    },

    getFileContent: async function(id) {
        let res = await this.request(url + `/api/category/file-content/${id}`, 'GET', null, true);
        return res;
    },

    login: async function(data) {
        let res = await this.request(url + `/api/login`, 'POST', data);
        return res;
    },

    getCurrentUser: async function() {
        let res = await this.request(url + '/api/user', 'GET');
        return res;
    }
};

export default Service;