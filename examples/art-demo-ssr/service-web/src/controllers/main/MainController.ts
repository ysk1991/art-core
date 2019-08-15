import { Controller, Get, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';
import MainService from '../../services/Main/MainService';

@Controller()
export default class HomeController {

  @Get('/')
  public async main(@Req() req: Request, @Res() res: Response) {
    const mainService = new MainService();
    const html = await mainService.requestRender(req);
    const renderedHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="keywords" content="put your keyword here" />
        <meta name="description" content="put your content here" />
        <title>it is title</title>
        <link rel="stylesheet" type="text/css" href="http://me.dev.com:3003/public/demo/ssr/main/bundle.css">
      </head>
      <body>
        ${html}
        <script type="text/javascript" src="http://me.dev.com:3003/public/demo/ssr/main/bundle.js"></script>
      </body>
      </html>
    `;

    return res.send(renderedHtml);
  }
}