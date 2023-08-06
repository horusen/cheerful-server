import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class JwtOauthGuard extends AuthGuard('jwt') {
  constructor(
    public configService: ConfigService,
    public sessionService: SessionService,
    private reflector: Reflector,
  ) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log('test', user);
    this.sessionService.userId = user.id;
    this.sessionService.businessId = user.business.id;

    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
