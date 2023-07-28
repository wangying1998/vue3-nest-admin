import { DataSource } from "typeorm";

// 创建数据源实例
const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'local',
    entities: [
        'Entity/*.js'
    ],
    entityPrefix: 'wy_'
})

AppDataSource.initialize()
    .then(() => {
        console.log("数据源已初始化！")
    })
    .catch((err) => {
        console.error("数据源初始化时出错", err)
    })

export default AppDataSource;