
import { DataSource, DataSourceOptions } from "typeorm";
import * as config from 'config'

const dbConfig = config.get('db')

export const dataSourceOptions: DataSourceOptions = {
  port: process.env.RDS_PORT || dbConfig.port,
  host: process.env.RDS_HOST || dbConfig.host,
  type: dbConfig.type,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DATABASE || dbConfig.database,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource