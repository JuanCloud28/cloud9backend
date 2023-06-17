import { Controller, Get, Post, Body, Patch, Param, Delete, Sse } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';

@Controller('assistance')
export class AssistanceController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @Sse('sse')
  sse() {
    return this.assistanceService.sendEvents();
  }

  @Post()
  create(@Body() createAssistanceDto: CreateAssistanceDto) {
    return this.assistanceService.create(createAssistanceDto);
  }

}
