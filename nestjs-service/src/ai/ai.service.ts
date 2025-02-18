import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiUrl = this.configService.get<string>('FASTAPI_SERVICE_URL');
    if (!apiUrl) {
      throw new Error('FASTAPI_SERVICE_URL is not defined in environment variables');
    }
    this.apiUrl = apiUrl;
  }

  async generateResponse(prompt: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.apiUrl}/generate`, {
          prompt,
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