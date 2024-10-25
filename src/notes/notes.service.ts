import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note, NoteDocument } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly notesRepository: Model<Note>,
  ) {}

  async create(note: Note): Promise<NoteDocument> {
    return new this.notesRepository(note).save();
  }

  async findAll(): Promise<NoteDocument[]> {
    return this.notesRepository.find().exec();
  }

  async findOneById(id: string): Promise<NoteDocument | null> {
    return this.notesRepository.findById(id).exec();
  }

  async findOneByTitle(title: string): Promise<NoteDocument | null> {
    return this.notesRepository.findOne({ title }).exec();
  }

  async update(id: string, note: Partial<Note>): Promise<NoteDocument | null> {
    const result = await this.notesRepository
      .updateOne({ _id: id }, note)
      .exec();
    if (!result.matchedCount) {
      return null;
    }

    return this.findOneById(id);
  }

  async remove(id: string): Promise<{ deletedCount: number }> {
    return this.notesRepository.deleteOne({ _id: id }).exec();
  }
}
