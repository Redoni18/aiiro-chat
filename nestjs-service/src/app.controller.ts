import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AiService } from './ai/ai.service';

@Controller()
export class AppController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Post('/ask')
  async ask(@Body() body: { question: string }) {
    if (!body.question) {
      throw new HttpException('Question is required', HttpStatus.BAD_REQUEST);
    }

    console.log('Received question:', body.question);
    return this.aiService.generateResponse(body.question);
  }
}
