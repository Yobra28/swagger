/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
 import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiResponse } from 'src/Api-Response/api-response.interface';
import { Note } from './interface/note.interface';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
        constructor(private readonly notesService: NoteService) {}

  @Post()
@Post()
async create(@Body() createnoteDto: CreateNoteDto): Promise<ApiResponse<Note>> {
  // eslint-disable-next-line no-useless-catch
  try {
    const note = await this.notesService.create(createnoteDto);
    return {
      success: true,
      message: 'note created successfully',
      note: note,
    };
  } catch (error) {
    throw error;  
  }
}



  @Get()
  async findAll(): Promise<ApiResponse<Note[]>> {
    try {
      const notes = await this.notesService.findAll();
      return {
        success: true,
        message: `Retrieved ${notes.length} notes`,
      note: notes,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve notes',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
    
  }

  @Get(':id')
   async findOne(@Param('id') id: number): Promise<ApiResponse<Note>> {
    try {
        const note = await this.notesService.findOne(id);
        return{
            success: true,
            message: `note with ID ${id} retrieved successfully`,
            note: note,
        }
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve note with ID ${id}`,
            error: error instanceof Error ? error.message : 'Unknown Error',
        };
    }
  }

 @Put(':id')
async update(@Param('id') id: number, @Body() updatenoteDto: UpdateNoteDto): Promise<ApiResponse<Note>> {
  try {
    const note = await this.notesService.update(id, updatenoteDto);
    return {
      success: true,
      message: `note with ID ${id} updated successfully`,
      note: note,  
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update note with ID ${id}`,
      error: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
}




@Delete(':id')
async Delete(@Param('id') id: number): Promise<ApiResponse<null>> {
  try {
    await this.notesService.Delete(id);
    return {
      success: true,
      message: `note with ID ${id} deleted permanently`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to delete note with ID ${id}`,
      error: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
}
}
