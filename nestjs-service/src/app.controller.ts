import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Post('/ask')
  async ask(@Body() body: { question: string }) {
    if (!body.question) {
      throw new HttpException('Question is required', HttpStatus.BAD_REQUEST);
    }

    console.log('Received question:', body.question);
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://fastapi-service:6000/generate', {
          prompt: body.question,
        }),
      );
      
      if (!response.data) {
        throw new HttpException('No response from AI service', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error processing request:', error);
      throw new HttpException(
        error.response?.data?.detail || 'Failed to process request',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
