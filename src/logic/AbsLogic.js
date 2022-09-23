const PropertyError = require("../utils/errors/PropertyError");

class AbsLogic {
    DefaultPageSize = 8;
    collect;
    constructor(Collection) {
        this.collect = Collection;
    }
    /*
        Insert new object
    */
    insert  = async function(data) {
        if (this.preInsert) this.preInsert(data);
        let insertData = new this.collect(data);
        await insertData.save();
        if (this.postInsert) this.postInsert(data);
        return insertData;
    }
    /*
    *   Update object
    *   Id is object id
    *   data is object data
    */
    update = async function(data) {
        let updates = Object.keys(data);
        const allowedUpdates = Object.keys(this.collect.schema.tree).filter((value, index, array) => {
            if (value.startsWith('_') || value.endsWith('id')){
                return false;
            }
            return true;
        });
        allowedUpdates.push("_id");
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error("please insert include properties");
        }

        let updateObj = await this.collect.findById(data._id);
        if (this.preUpdate) this.preUpdate(updateObj);
        if (!updateObj) {
            throw new PropertyError('_id', 'Không tìm thấy đối tượng.');
        }

        updates.forEach((update) => updateObj[update] = data[update]);
        await updateObj.save();
        if (this.postUpdate) this.postUpdate(updateObj);
        return updateObj;
    }
    /*
    * Delete an object
    * @param id is id of object
    */
    delete = async function (id) {
        let deleteObj = await this.collect.findById(id);
        if (!deleteObj) {
            throw new PropertyError('_id', 'Không tìm thấy đối tượng.');
        }
        await deleteObj.remove();
        return deleteObj;
    }

    findById = async function (id) {
        let item = await this.collect.findById(id);
        return item;
    }

    search = async function (searchData) {
        let query = this.collect.find(searchData.query);
        if (this.virtuals) {
            for (let virtual of this.virtuals) {
                query = query.populate(virtual)
            }
        }
        let list = await query.sort([['_id', -1]]).skip(searchData.page).limit(searchData.limit);
        let count = await this.collect.countDocuments(searchData.query);
        let result = {
            list,
            page: searchData.page,
            count
        }
        return result;
    }
}

module.exports = AbsLogic;