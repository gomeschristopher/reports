import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    create(name: string, price: number) {
        const report = this.repo.create({ name, price });

        return this.repo.save(report);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    find(name: string) {
        return this.repo.find({ where: { name } });
    }

    async update(id: number, attrs: Partial<Report>) {
        const report = await this.findOne(id);

        if(!report) {
            throw new NotFoundException('report not found');
        }

        Object.assign(report, attrs);

        return this.repo.save(report);
    }

    async remove(id: number) {
        const report = await this.findOne(id);

        if(!report) {
            throw new NotFoundException('report not found');
        }

        return this.repo.remove(report);
    }
}
