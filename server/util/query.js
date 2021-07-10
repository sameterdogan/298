import CustomError from "./CustomError";

export const filterQueryMethod = (filterKeys, query, req) => {
    if (req.query.filter) {
        const filter = JSON.parse(req.query.filter)
        for (const key in filter) {
            if (filterKeys.indexOf(key) < 0 || filter[key] === '') {
                delete filter[key]
            }

            if (key === 'title') {
                filter[key] = new RegExp(filter[key], 'gi')
            }

        }
        if (filter !== {}) {
            query = query.where(filter)
            return { query, filter }
        }
    }
    return { query }
}

export const sortQueryMethod = (req, query) => {
    const sort = {}
    const { sortBy, groupBy } = req.query.sort
        ? JSON.parse(req.query.sort)
        : { sortBy: 'desc', groupBy: 'createdAt' }
    switch (groupBy) {
        case 'color':
            sort[groupBy] = sortBy || 'desc'
            break
        case 'range':
            sort[groupBy] = sortBy || 'desc'
            break
        case 'price':
            sort[groupBy] = sortBy || 'desc'
            break
        default:
            sort['createdAt'] = 'desc'
    }
    query = query.sort(sort)
    return query
}

export const paginationQueryMethod = (count, req, query) => {
/*    const pagination = {
        isEndIndex: true,
    }
    const paginationProps = req.query.paginationProps ? JSON.parse(req.query.paginationProps) : {start: 0, limit: 15}
    const start = Number(paginationProps.start)
    const limit = Number(paginationProps.limit)
    console.log(start)
    console.log(limit)
    start + limit >= count || count === undefined ? pagination['isEndIndex'] = true : pagination['isEndIndex'] = false

    pagination['query'] = query.skip(start).limit(limit)
    return pagination*/

    const paginationProps = req.query.paginationProps ? JSON.parse(req.query.paginationProps) : {page: 1, limit: 10}
    const page = Number(paginationProps.page)
    const limit = Number(paginationProps.limit)
    let paginationObject = {}
    paginationObject.totalPage = Math.ceil(count / limit)
    console.log(paginationObject.totalPage)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit
    if (endIndex < count) {
        paginationObject.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        paginationObject.previous = {
            page: page - 1,
            limit: limit
        }
    }
    paginationObject['query'] = query.skip(startIndex).limit(limit)

    return paginationObject
}