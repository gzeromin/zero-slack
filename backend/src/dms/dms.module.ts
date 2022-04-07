import { Module } from '@nestjs/common';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { Workspaces } from 'src/entities/Workspaces';
import { Users } from 'src/entities/Users';
import { DMs } from 'src/entities/DMs';

@Module({
  imports: [TypeOrmModule.forFeature([DMs, Users, Workspaces]), EventsModule],
  providers: [DmsService],
  controllers: [DmsController]
})
export class DmsModule {}
