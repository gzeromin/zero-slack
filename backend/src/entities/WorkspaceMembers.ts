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
import { Workspaces } from './Workspaces';

@Index('UserId', ['UserId'], {})
@Entity('workspacemembers', { schema: 'sleact' })
export class WorkspaceMembers {
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', {name: 'WorkspaceId', primary: true})
  WorkspaceId: number | null;

  @Column('int', {name: 'UserId', primary: true})
  UserId: number | null;

  @Column('datetime', { name: 'loggedInAt', nullable: true })
  loggedInAt: Date | null;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  @JoinColumn([{name: 'WorkspaceId', referencedColumnName: 'id'}])
  Workspace: Workspaces;

  @ManyToOne(() => Users, (users) => users.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  
  @JoinColumn([{name: 'UserId', referencedColumnName: 'id'}])
  User: Users;

}