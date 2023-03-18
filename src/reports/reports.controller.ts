import { Body, Controller, Post, Get, Patch, Param, Query, NotFoundException } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    createReport(@Body() body: CreateReportDto) {
        this.reportsService.create(body.name, body.price);
    }

    @Get('/:id')
    findReport(@Param('id') id: string) {
        const report = this.reportsService.findOne(parseInt(id));

        if(!report) {
            throw new NotFoundException('report not found');
        }

        return report;
    }

    @Get()
    findAllReports(@Query('name') name: string) {
        return this.reportsService.find(name);
    }

    @Delete('/:id')
    removeReport(@Param('id') id: string) {
        return this.reportsService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
        return this.reportsService.update(parseInt(id), body);
    }
}
