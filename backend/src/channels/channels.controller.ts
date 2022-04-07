import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  ParseIntPipe, 
  Post, 
  Query, 
  UploadedFiles, 
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import fs from 'fs';
import { url } from 'inspector';
import multer from 'multer';
import path from 'path';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';


try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('create uploads folder since there is not uploads folder');
  fs.mkdirSync('uploads');
}

@ApiTags('CHANELS')
@ApiCookieAuth('connect.sid')
@UseGuards(LoggedInGuard)
@Controller('api/workspaces')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @ApiOperation({ summary: 'get all workspace channels'})
  @Get(':url/channels')
  async getWorkspaceChannels(@Param('url') url, @User() user: Users) {
    return this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @ApiOperation({ summary: 'get one workspace channel'})
  @Get(':url/channels/:name')
  async getWorkspaceChannel(@Param('url') url, @Param('name') name) {
    return this.channelsService.getWorkspaceChannel(url, name);
  }

  @ApiOperation({ summary: 'make workspace channel'})
  @Post(':url/channels')
  async createWorkspaceChannels(
    @Param('url') url,
    @Body() body: CreateChannelDto,
    @User() user: Users
  ) {
    return this.channelsService.createWorkspaceChannels(
      url,
      body.name,
      user.id
    );
  }

  @ApiOperation({ summary: 'get workspace channel memeber' })
  @Get(':url/channels/:name/members')
  async getWorkspaceChannelMembers(
    @Param('url') url: string,
    @Param('name') name: string
  ) {
    return this.channelsService.getWorkspaceChannelMembers(url, name);
  }

  @ApiOperation({ summary: 'invite workspace channel member' })
  @Post(':url/channels/:name/members')
  async createWorkspaceMembers(
    @Param('url') url: string,
    @Param('name') name: string,
    @Body('email') email
  ) {
    return this.channelsService.createWorkspaceChannelMembers(url, name, email);
  }

  @ApiOperation({ summary: 'get all channel chatting in one workspace channel' })
  @Get(':url/channels/:name/chats')
  async getWorkspaceChannelChats(
    @Param('url') url,
    @Param('name') name,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number
  ) {
    return this.channelsService.getWorkspaceChannelChats(
      url,
      name,
      perPage,
      page
    );
  }
  
  @ApiOperation({ summary: 'create one channel chatting in workspace'})
  @Post(':url/channels/:name/chats')
  async createWorkspaceChannelChats(
    @Param('url') url,
    @Param('name') name,
    @Body('content') content,
    @User() user: Users
  ) {
    return this.channelsService.createWorkspaceChannelChats(
      url,
      name,
      content,
      user.id
    );
  }

  @ApiOperation({ summary: 'uplaod image to one channel workspace' })
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multer.diskStorage({
        destination(_req, _file, cb) {
          cb(null, 'uploads/');
        },
        filename(_req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
      }),
      limits: {fileSize: 5 * 1024 * 1024} // 5MB
    })
  )
  @Post(':url/channels/:name/images')
  async createWorkspaceChannelmages(
    @Param('url') url,
    @Param('name') name,
    @UploadedFiles() files: Express.Multer.File[],
    @User() user: Users
  ) {
    return this.channelsService.createWorkspaceChannelImages(
      url,
      name,
      files,
      user.id
    );
  }

  @ApiOperation({ summary: 'get count not read'})
  @Get(':url/channels/:name/unreads')
  async getUnreads(
    @Param('url') url,
    @Param('name') name,
    @Query('after', ParseIntPipe) after: number
  ) {
    return this.channelsService.getChannelUnreadCount(url, name, after);
  }


}
