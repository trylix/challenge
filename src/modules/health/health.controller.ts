import { Controller, Get, Response } from '@decorators/express';
import * as express from 'express';

@Controller('/health')
export class HealthController {
  @Get('/')
  getData(@Response() res: express.Response) {
    res.status(200).json({
      status: 'online',
    });
  }
}
