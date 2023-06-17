import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';
import { Subject, map } from 'rxjs';
import { log } from 'console';

@Injectable()
export class AssistanceService {
  private readonly events = new Subject();
  constructor(){}

  create(createAssistanceDto: CreateAssistanceDto) {
    try {
      this.addEvent(createAssistanceDto);

      if(createAssistanceDto.id == 101){
        return `Assistance for table ${createAssistanceDto.tableId} asked succesfully`;
      }
  
      return `Coals assistance for table ${createAssistanceDto.tableId} asked succesfully`;

    } catch (error) {
      log('createAssistance : ' + error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);      
    }
    

  }

  addEvent(event) {
      this.events.next(event);
      log('events:', this.events, 'event:', event)
  }

  sendEvents() {
      try {
          return this.events.asObservable().pipe(
            map((notification: CreateAssistanceDto) => JSON.stringify(notification))
          );
    
        } catch (error) {
          log('sendEvents : ' + error.message);
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }
}
