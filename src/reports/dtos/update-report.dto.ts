import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateReportDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;
}