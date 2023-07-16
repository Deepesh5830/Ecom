class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {productName:{
            $regex : this.queryStr.keyword,
            $options:'i'
        }} :{};
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr}
        //Removing some fields for catagory
        const removeFields =['keyword','page','limit'];
        removeFields.forEach(key =>delete queryCopy[key]);
        console.log(queryCopy)
        //Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) =>`$${key}`)
         
        let queryCopys = JSON.parse(queryStr);
        this.query = this.query.find(queryCopys);
        console.log(queryStr);
        return this;
    }

pagination(resultperpage){
    const currentpage =Number(this.queryStr.page) || 1;
    const skip = resultperpage * (currentpage - 1);
    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
}

}

module.exports = ApiFeatures;