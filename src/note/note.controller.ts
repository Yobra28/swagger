/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
 import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
//import { ApiResponse as ApiResponseType } from 'src/Api-Response/api-response.interface';
import { Note } from './interface/note.interface';
//import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteService } from './note.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NoteController {
    constructor(private readonly notesService: NoteService) {}


  @Post()
  @ApiOperation({ summary: "Create a new note" })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({
    status: 201,
    description: "The note has been successfully created.",
    type: CreateNoteDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }



@Get()
@ApiResponse({ status: 200, description: 'All notes' })
findAll() {
  return this.notesService.findAll();
}

 @Get(':id')
  @ApiResponse({ status: 200, description: 'Single note' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }
  @Put(':id')
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Note updated' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Note deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }
}