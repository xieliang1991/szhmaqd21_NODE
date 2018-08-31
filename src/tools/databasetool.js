//连接数据库的第三方包mongodb
const MongoClient = require("mongodb").MongoClient;
//获取数据库中的ObjectId
const ObjectId = require("mongodb").ObjectId;
//导出ID
exports.ObjectId = ObjectId;
//数据库路径
const url = "mongodb://localhost:27017";
//数据库名
const dbName = "szhmqd21";



//封装连接数据库的方法
const connectDB = (collectionName, callback) => {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 拿到了数据操作的db对象
            const db = client.db(dbName);

            // 拿到集合
            const collection = db.collection(collectionName);

            // 把结果传递出去
            callback(err, client, collection);
        }
    );
};

/**
 * 暴露给控制器用的，查询列表的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findList = (collectionName, params, callback) => {
    //调用封装好的方法
    connectDB(collectionName, (err, client, collection) => {
        //根据条件查询列表
        collection.find(params).toArray((err, docs) => {
            //关闭数据库连接
            client.close()
            //执行callback回调函数把结果返回给控制器
            callback(err, docs)
        })

    })
}

/**
 * 暴露给控制器用的，查询一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findOne = (collectionName, params, callback) => {
    //调用连接数据库的方法
    connectDB(collectionName, (err, client, collection) => {
        //根据条件查询一条数据
        collection.findOne(params, (err, doc) => {
            //关闭数据库连接
            client.close()
            //调用会点函数把结果但会给控制器
            callback(err, doc)
        })
    })
}

/**
 * 暴露给控制器用的，新增一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.insertOne = (collectionName, params, callback) => {
    //调用封装好的方法
    connectDB(collectionName, (err, client, collection) => {
        //根据条件新增一条数据
        collection.insertOne(params, (err, result) => {
            //关闭数据库连接
            client.close()
            //调用回调函数,把结果返回给控制器
            callback(err, result)

        })
    })
}


/**
 * 暴露给控制器用的，修改一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} condition 条件
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.updateOne = (collectionName, condition, params, callback) => {
    //调用封装号的方法
    connectDB(collectionName, (err, client, collection) => {
        //根据条件修改一条数据
        collection.updateOne(condition, {
            $set: params
        }, (err, result) => {
            //关闭数据库连接
            client.close();
            //执行callback回调函数，把结果返回给浏览器
            callback(err, result);
        })
    })

}

/**
 * 暴露给控制器用的，删除一条数据的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.deleteOne = (collectionName, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
        collection.deleteOne(params, (err, result) => {
            //关闭数据库连接
            client.close()
            //执行回调函数，把结果返回给控制器
            callback(err, result);
        })
    })
}