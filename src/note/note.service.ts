/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './interface/note.interface';
import { DatabaseService } from 'src/Database/connection.service';

@Injectable()
export class NoteService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const existingNote = await this.databaseService.query(
        `SELECT * FROM notes WHERE title = $1`,
        [createNoteDto.title],
    );
    if (existingNote.rows && existingNote.rows.length > 0) {
        throw new ConflictException(
            `note with title ${createNoteDto.title} already exists`,
        );
    }
    try {
        const result = await this.databaseService.query(
            `SELECT * FROM create_note($1, $2)`,
            [createNoteDto.title, createNoteDto.consent],
        );
        console.log('DB result:', result.rows);
        if (!result.rows || result.rows.length === 0) {
            throw new InternalServerErrorException(
                'No data returned from create_note function',
            );
        }
        return this.mapRowToNote(result.rows[0]);
    } catch (error: unknown) {
        console.error(
            'Database error stack:',
            error instanceof Error ? error.stack : error,
        );
        if (error instanceof Error && error.message.includes('already exists')) {
            throw new ConflictException(error.message);
        }
        throw new InternalServerErrorException(
            error instanceof Error ? error.message : 'Failed to create note',
        );
    }
}

mapRowTonotes(row: any): Note {
    return {
        id: row.id,
        title: row.title,
        consent: row.consent,
        createdAt: row.createdat ? new Date(row.createdat) : new Date(),
    };
}

async findAll(): Promise<Note[]> {
    const result = await this.databaseService.query('SELECT * FROM get_all_notes()', []);
    if (!result || !result.rows) {
      throw new InternalServerErrorException('Failed to retrieve notes');
    }
    return result.rows;
  }

  async findOne(id: number): Promise<Note> {
  const result = await this.databaseService.query('SELECT * FROM get_note_by_id($1)', [id]);
  if (!result || !result.rows || result.rows.length === 0) {
    throw new NotFoundException(`note with ID ${id} not found`);
  }
  return this.mapRowToNote(result.rows[0]);
}
    mapRowToNote(row: any): Note {
        return {
            id: row.id,
            title: row.title,
            consent: row.consent,
            createdAt: row.createdAt ? new Date(row.createdAt) : new Date()
        };
    }
  async update(id: number, updatenotedto: UpdateNoteDto): Promise<Note> {
  try {
    const result = await this.databaseService.query(
      `SELECT * FROM update_note($1, $2, $3)`,
      [
        id,
        updatenotedto.title,
        updatenotedto.title,
      ],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException(`NOTE with ID ${id} not found`);
    }
    return result.rows[0];
  } catch (error: unknown) {
    console.error('Database error:', error instanceof Error ? error.message : error);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(error instanceof Error ? error.message : `Failed to update note ${id}`);
  }
}

async Delete(id: number): Promise<void> {
  try {
    const result = await this.databaseService.query(
      `DELETE FROM notes WHERE id = $1`,
      [id],
    );
    if (result.rowCount === 0) {
      throw new NotFoundException(`note with ID ${id} not found`);
     }
  } catch (error) {
    console.error('Database error:', error);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(`Failed to delete note ${id}`);
  }
}

}



