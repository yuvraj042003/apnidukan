const { remove } = require("../models/Productmodel");

class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",
            },
        }
        :{};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const querycopy = {...this.queryStr};
        // Remove field and its categry
        const removeFields = ["keyword","page","limit"];
        
        removeFields.forEach(key=>delete querycopy [key]);
        this.query = this.query.find(querycopy);
        // return this;

        // Filter for price and rating
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultParPage){
        const currentPage  = Number(this.queryStr.page) || 1;
        const skip = resultParPage * (currentPage - 1);
        this.query = this.query.limit(resultParPage).skip(skip);

        return this;
    }
}
module.exports = ApiFeatures;

