import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACES')
@ApiCookieAuth('connect.sid')
@UseGuards(LoggedInGuard)
@Controller('api/workspaces')
export class WorkspacesController {
  
  constructor(private workspacesService: WorkspacesService) {}

  @ApiOperation({ summary: 'get my workspace' })
  @Get()
  async getMyWorkspaces(@User() user: Users) {
    return this.workspacesService.findMyWorkspaces(user.id);
  }

  @ApiOperation({ summary: 'create workspace' })
  @Post()
  async createWorkspaces(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id
    );
  }

  @ApiOperation({ summary: 'get workspace member' })
  @Get(':url/members')
  async getAllMembersFromWorkspace(@Param('url') url: string) {
    return this.workspacesService.getWorkspaceMembers(url);
  }

  @ApiOperation({ summary: 'invite workspace member'})
  @Post(':url/members')
  async createWorkspaceMembers(
    @Param('url') url: string,
    @Body('email') email
  ) {
    return this.workspacesService.createWorkspaceMembers(url, email);
  }

  @ApiOperation({ summary: 'get workspace one member' })
  @Get(':url/members/:id')
  async getWorkspaceMember(
    @Param('url') url: string,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.workspacesService.getWorkspaceMember(url, id);
  }

  @ApiOperation({ summary: 'get workspace one member' })
  @Get(':url/users/:id')
  async getWorkspaceUser(
    @Param('url') url: string,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.workspacesService.getWorkspaceMember(url, id);
  }
  
  @ApiOperation({ summary: '' })
  @Get(':url/members/:id')
  async getMemberInfoWorkspace() {
    
  }
  
  @ApiOperation({ summary: '' })
  @Get(':url/users/:id')
  async DEPRECATED_getMemberInfoWorkspace() {
    this.getMemberInfoWorkspace();
  }
  
  @ApiOperation({ summary: '' })
  @Post(':url/members')
  async inviteMembersToWorkspace() {
  }

  @ApiOperation({ summary: '' })
  @Delete(':url/members/:id')
  async kickMemberFromWorkspace() {
    
  }
}
