import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { url } from 'inspector';
import multer from 'multer';
import path from 'path';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { DmsService } from './dms.service';

try {
  fs.readdirSync('uploads');
} catch(error) {
  console.error('create uploads folder since there is not uploads folder.');
  fs.mkdirSync('uploads');
}

@ApiTags('DM')
@ApiCookieAuth('connect.sid')
@UseGuards(LoggedInGuard)
@Controller('api/workspaces')
export class DmsController {
  constructor(private dmsService: DmsService) {}

  // @ApiParam({
  //   name: 'url',
  //   required: true,
  //   description: 'workspace url'
  // })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'user id'
  // })
  // @ApiQuery({
  //   name: 'perPage',
  //   required: true,
  //   description: '한 번에 가져오는 개수'
  // })
  // @ApiQuery({
  //   name: 'page',
  //   required: true,
  //   description: '불러올 페이지'
  // })
  // @Get(':id/chats')
  // getChat(@Query() query, @Param() param) {
  //   console.log(query.perPage, query.page);
  //   console.log(param.id, param.url);

  // }

  // @Post(':id/chats')
  // postChat(@Body() body) {

  // }

  @ApiOperation({ summary: 'get all workspace dm'})
  @Get(':url/dms')
  async getWorkspaceChanels(@Param('url') url, @User() user: Users) {
    return this.dmsService.getWorkspaceDMs(url, user.id);
  }

  @ApiOperation({ summary: 'get all dm of one workspace'})
  @Get(':url/dms/:id/chats')
  async getWorkspaceDMChats(
    @Param('url') url,
    @Param('id', ParseIntPipe) id: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number, 
    @User() user: Users
  ) {
    return this.dmsService.getWorkspaceDMChats(url, id, user.id, perPage, page);
  }

  @ApiOperation({ summary: 'create one chat in workspace'})
  @Post(':url/dms/:id/chats')
  async createWorkspaceDMChats(
    @Param('url') url,
    @Param('id', ParseIntPipe) id: number,
    @Body('content') content, 
    @User() user: Users
  ) {
    return this.dmsService.createWorkspaceDMChats(url, content, id, user.id);
  }

  @ApiOperation({ summary: 'upload one dm image in workspace'})
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multer.diskStorage({
        destination(req, file, db) {
          db(null, 'uploads/')
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
      }),
      limits: { fileSize: 5 * 1024 * 1024 }
    })
  )
  @Post(':url/dms/:id/images')
  async createWorkspaceDMImages(
    @Param('url') url,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @User() user: Users
  ) {
    return this.dmsService.createWorkspaceDMImages(url, files, id, user.id);
  }

  @ApiOperation({ summary: 'get count of not read'})
  @Get(':url/dms/:id/unreads')
  async getUnreads(
    @Param('url') url,
    @Param('id', ParseIntPipe) id: number,
    @Query('after', ParseIntPipe) after: number,
    @User() user: Users
  ) {
    return this.dmsService.getDMUnreadsCount(url, id, user.id, after);
  }
}
