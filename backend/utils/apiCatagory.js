class ApiCatagory {
    constructor(query, querystr) {
        this.query = query
        this.querystr = querystr
    }

    search() {
        const keyword = this.querystr.keyword ?
            {
                catagory: {
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

    pagination(resultPrePage){
        const currentpage = Number(this.querystr.page) || 1
        const skip = resultPrePage * (currentpage - 1)
        this.query = this.query.limit(resultPrePage).skip(skip)
        return this
    }
}

export default ApiCatagory