import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { User } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'success',
    type: UserDto
  })
  @ApiResponse({
    status: 500,
    description: 'server error'
  })
  @ApiOperation({ summary: '내 정보 조회'})
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입'})
  @Post()
  async join(@Body() data: JoinRequestDto) {
    await this.userService.join(data.email, data.nickname, data.password);
  }

  @ApiResponse({
    status: 200,
    description: 'success',
    type: UserDto
  })
  @ApiOperation({ summary: '로그인'})
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  login(@User() user) {
    console.log(user);
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃'})
  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', {httpOnly: true});
    res.send('ok');
  }
}
