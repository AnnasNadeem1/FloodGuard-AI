import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import axios from 'axios';
import FormData = require('form-data');
import * as fs from 'fs';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) {}

  // 1. Create a new report in MongoDB
  async create(createReportDto: any): Promise<Report> {
    const createdReport = new this.reportModel(createReportDto);
    return createdReport.save();
  }

  // 2. Get all reports
  async findAll(): Promise<Report[]> {
    return this.reportModel.find().sort({ createdAt: -1 }).exec();
  }

  // 3. Get one report
  async findOne(id: string): Promise<Report | null> {
    return this.reportModel.findById(id).exec();
  }
  // Find reports belonging to a specific user
  async findByUser(userId: string): Promise<Report[]> {
    return this.reportModel.find({ ownerId: userId }).sort({ createdAt: -1 }).exec();
  }

  // 4. (NEW) Send Image + Text to Python AI Server
  async analyzeImage(file: Express.Multer.File, description: string) {
    try {
      const formData = new FormData();
      
      // Attach the image file from the local uploads folder
      formData.append('image_file', fs.createReadStream(file.path));
      
      // Attach the text description
      formData.append('description', description || "Flood analysis");

      // Send to Python API (Running on port 8000)
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Return the JSON data from Python
      return response.data;

    } catch (error) {
      console.error("AI Service Error:", error.message);
      // If Python fails, return a mock/fallback so the app doesn't crash
      return {
        final_result: "Analysis Failed (Server Error)",
        confidence: 0,
        severity: "Unknown",
        binary: "Unknown"
      };
    }
  }
}