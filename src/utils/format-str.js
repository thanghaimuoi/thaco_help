const FormatString = {
    AccentsMap : [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"    
    ],
    removeAccents : function (str) {
        if (!str) {
            return '';
        }
        for (var i = 0; i < this.AccentsMap.length; i++) {
          var re = new RegExp('[' + this.AccentsMap[i].substr(1) + ']', 'g');
          var char = this.AccentsMap[i][0];
          str = str.replace(re, char);
        }
        return str;
    },

    formatUrl : function (str) {
        if (!str) {
            return '';
        }
        let url = this.removeAccents(str);
        url = url.toLowerCase();
        url = url.replace(/ /g, '-');
        return url;
    },

    cutString : function(str, len) {
        if (!str) {
            return '';
        }
        if (str.lenth < len) {
            return str;
        }
        let cutStr = str.substring(0, len);
        let spaceLastIndex = cutStr.lastIndexOf(' ');
        cutStr = cutStr.substring(0, spaceLastIndex) + '...'
        return cutStr;
    },

    formatDate : function(date) {
        if (!date) {
            return '';
        }
        if (typeof date == 'string') {
            return date;
        }
        let dd = date.getDate();
        let mm = date.getMonth()+1; 
        let yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    },

    formatDateForEdit : function(date) {
        if (!date) {
            return '';
        }
        if (typeof date == 'string') {
            return date;
        }
        let dd = date.getDate();
        dd = dd < 10 ? '0' + dd : dd;
        let mm = date.getMonth()+1; 
        mm = mm < 10 ? '0' + mm : mm;
        let yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }
}

module.exports = FormatString;