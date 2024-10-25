import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    if (await this.notesService.findOneByTitle(createNoteDto.title)) {
      throw new ConflictException(
        `Note \`${createNoteDto.title}\` already exists`,
      );
    }

    const note = new Note();
    note.title = createNoteDto.title;
    note.description = createNoteDto.description;
    note.content = createNoteDto.content;
    note.author = createNoteDto.author;
    note.tags = createNoteDto.tags;

    return this.notesService.create(note);
  }

  @Get()
  async findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const note = await this.notesService.findOneById(id);
    if (!note) {
      throw new NotFoundException(`Note with id \`${id}\` not found.`);
    }

    return note;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    if (!Object.keys(updateNoteDto).length) {
      throw new BadRequestException(
        `At least one valid property of Note needs to be provided.`,
      );
    }

    const note = await this.notesService.update(id, updateNoteDto);
    if (!note) {
      throw new NotFoundException(`Note with id \`${id}\` not found.`);
    }

    return note;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { deletedCount } = await this.notesService.remove(id);
    if (!deletedCount) {
      throw new NotFoundException(`Note with id \`${id}\` not found.`);
    }

    return;
  }
}
