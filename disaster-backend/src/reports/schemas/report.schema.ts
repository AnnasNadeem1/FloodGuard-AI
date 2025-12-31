import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
  @Prop({ required: true })
  title: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  severity: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  confidence: string;

  @Prop({ default: 'Pending' })
  status: string;

  // --- THIS MUST BE HERE ---
  @Prop({ required: true }) 
  ownerId: string; 
  // ------------------------
}

export const ReportSchema = SchemaFactory.createForClass(Report);