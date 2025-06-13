/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { DatabaseService } from 'src/Database/connection.service';
import { NoteController } from './note.controller';
@Module({
  imports: [],
  controllers: [NoteController],
  providers: [NoteService, DatabaseService],
})
@Module({})
export class NoteModule {}
