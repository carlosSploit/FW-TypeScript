import { Request } from "express"
import { Connection, MysqlError, PoolConnection } from "mysql";

export type MySqlConnetCallback = (err:MysqlError, connection: PoolConnection|Connection|any) => void;
export type MySqlConnetFuction = (callback: MySqlConnetCallback) => void;

export interface IURequest extends Request {
  token?: string,
  file?: any,
  getConnection?: MySqlConnetFuction
}