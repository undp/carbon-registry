import { Injectable } from '@nestjs/common';
import { STAGE } from '../constants';

@Injectable()
export class NationalAPIService {
  getHello(): string {
    return 'Hello National API :' + STAGE;
  }
}
