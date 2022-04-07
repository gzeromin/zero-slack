import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from 'dotenv';
import { ChannelChats } from "./src/entities/ChannelChats";
import { ChannelMembers } from "./src/entities/ChannelMembers";
import { Channels } from "./src/entities/Channels";
import { DMs } from "./src/entities/DMs";
import { Mentions } from "./src/entities/Mentions";
import { Users } from "./src/entities/Users";
import { WorkspaceMembers } from "./src/entities/WorkspaceMembers";
import { Workspaces } from "./src/entities/Workspaces";

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'sleact',
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces
  ],
  synchronize: false,
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: process.env.NODE_ENV !== 'production',
  keepConnectionAlive: true,
}

export = config;