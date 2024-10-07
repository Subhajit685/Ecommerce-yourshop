class ApiFeatures {
    constructor(query, querystr) {
        this.query = query
        this.querystr = querystr
    }

    search() {
        const keyword = this.querystr.keyword ?
            {
                productname: {
                    $regex: this.querystr.keyword,
                    $options: 'i',
                },
            } : {};


        this.query = this.query.find({ ...keyword })
        return this
    }
    filter(){
        const querycopy = {...this.querystr}
        const removefild = ["keyword", "page", "limit"]
        removefild.forEach(key=> delete querycopy[key])

        let newquery = JSON.stringify(querycopy)
        newquery = newquery.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`)

        this.query = this.query.find(JSON.parse(newquery))
        return this
    }

    pagination(resulrperpage){
        const currentpage = Number(this.querystr.page) || 1
        const skip = resulrperpage * (currentpage - 1)
        this.query = this.query.limit(resulrperpage).skip(skip)
        return this
    }
}

export default ApiFeatures