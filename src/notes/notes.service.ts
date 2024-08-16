import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './entities/note.entity';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteRepository: Model<Note>,
  ) {}

  async create(note: Note): Promise<Note> {
    return new this.noteRepository(note).save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find().exec();
  }

  async findOneById(id: string): Promise<Note | null> {
    return this.noteRepository.findById(id).exec();
  }

  async findOneByTitle(title: string): Promise<Note | null> {
    return this.noteRepository.findOne({ title }).exec();
  }

  async update(id: string, note: Partial<Note>): Promise<Note | null> {
    const result = await this.noteRepository
      .updateOne({ _id: id }, note)
      .exec();
    if (!result.matchedCount) {
      return null;
    }

    return this.findOneById(id);
  }

  async remove(id: string): Promise<{ deletedCount: number }> {
    return this.noteRepository.deleteOne({ _id: id }).exec();
  }
}
