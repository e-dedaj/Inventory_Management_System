import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Emri i produktit nuk mund të lihet bosh!' })
  @IsString({ message: 'Emri i produktit duhet të jetë tekst!' })
  name!: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Çmimi duhet të jetë një numër!' })
  @Min(0.01, { message: 'Çmimi nuk mund të jetë 0 ose negativ!' })
  price!: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Stoku duhet të jetë një numër!' })
  @Min(0, { message: 'Stoku nuk mund të jetë më i vogël se 0!' })
  stockQuantity!: number; //përdorim operatorin ! (Non-null assertion operator) pas emrit të çdo variable. Kjo i thotë TypeScript-it: "Mos u shqetëso, kjo vlerë do të ekzistojë patjetër!"
  @IsString()
  @IsNotEmpty()
  categoryName!: string;
  
}