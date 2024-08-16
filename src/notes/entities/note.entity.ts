import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  author: string;

  @Prop([String])
  tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
