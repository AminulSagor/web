import { Body, Controller, Post, Req, Res, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './login.dto';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')

  @UsePipes(new ValidationPipe())

 async login(@Body() data: LoginDTO, @Session() session) {
      if (await this.loginService.login(data)){

        session.email = data.username;

        return {message: 'success login',email: data.username};
    }

    else
    {
 return {message: 'Invalid login'}

    }

  }

}

