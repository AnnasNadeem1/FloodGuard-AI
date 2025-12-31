import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // 1. ANALYZE Endpoint (React calls this)
  @Post('analyze')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Save file locally first
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async analyze(
    @UploadedFile() file: Express.Multer.File,
    @Body('text') description: string
  ) {
    // Call the service to talk to Python
    const aiResult = await this.reportsService.analyzeImage(file, description);
    
    // Return AI data + the local image URL
    return {
      ...aiResult,
      imageUrl: `http://localhost:3000/uploads/${file.filename}`
    };
  }

  // 2. Upload Endpoint (Simple upload without analysis)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `http://localhost:3000/uploads/${file.filename}` };
  }

  // 3. Standard CRUD Endpoints
  @Post()
  create(@Body() createReportDto: any) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.reportsService.findByUser(userId);
  }
}