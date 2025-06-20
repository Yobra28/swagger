/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './interface/note.interface';
import { DatabaseService } from 'src/Database/connection.service';

@Injectable()
export class NoteService {
    mapRowToNote: any;
  constructor(private readonly databaseService: DatabaseService) {}

   async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const query = `
      INSERT INTO notes (title, content)
      VALUES ($1, $2)
      RETURNING id, title, content, created_at
    `;

    const result: { rows: Note[] } = await this.databaseService.query(query, [
      createNoteDto.title,
      createNoteDto.content,
    ]);

    return result.rows[0];
  }


 async findAll() {
    try {
      const result = await this.databaseService.query('SELECT * FROM get_all_notes()');
      return result.rows;
    } catch {
      throw new InternalServerErrorException('Error fetching notes');
    }
  }

  async findOne(id: number) {
    const result = await this.databaseService.query('SELECT * FROM get_note_by_id($1)', [id]);
    if (result.rows.length === 0) throw new NotFoundException('Note not found');
    return result.rows[0];
  }

  async update(id: number, dto: UpdateNoteDto) {
    try {
      await this.databaseService.query('CALL update_note($1, $2, $3)', [id, dto.title, dto.content]);
      return { message: 'Note updated successfully' };
    } catch {
      throw new InternalServerErrorException('Error updating note');
    }
  }

  async remove(id: number) {
    try {
      await this.databaseService.query('CALL delete_note_by_id($1)', [id]);
      return { message: 'Note deleted successfully' };
    } catch {
      throw new InternalServerErrorException('Error deleting note');
    }
  }
}