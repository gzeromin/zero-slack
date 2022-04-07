import {
  Column,
  CreateDateColumn,
  Entity,
  Index, 
  JoinColumn,
  ManyToOne,
  UpdateDateColumn
}　from 'typeorm';

import { Users } from './Users';
import { Channels } from './Channels';

@Index('UserId', ['UserId'], {})
@Entity({ schema: 'sleact', name: 'channelmembers' })
export class ChannelMembers {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', {name: 'UserId', primary: true})
  UserId: number | null;

  @Column('int', {name: 'ChannelId', primary: true})
  ChannelId: number | null;

  @ManyToOne(() => Channels, (channels) => channels.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  @JoinColumn([{name: 'ChannelId', referencedColumnName: 'id'}])
  Chnnel: Channels;

  @ManyToOne(() => Users, (users) => users.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  
  @JoinColumn([{name: 'UserId', referencedColumnName: 'id'}])
  User: Users;
}