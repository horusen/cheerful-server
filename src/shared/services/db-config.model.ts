export interface DBConfig {
  type: string;
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  uri: string;
  synchronize: boolean;
  dropSchema: boolean;
}
