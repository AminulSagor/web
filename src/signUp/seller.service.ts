import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerDTO } from './seller.dto';
import { SellerEntity } from './seller.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { SellerCDTO } from './seller.dto copy';
import { profileDTO } from './profile.dto';
import { PhotoEntity } from './profile.entity';


@Injectable()
export class SellerService {
  private Otp: string = this.generateOTP();
  constructor(
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
    private mailerService: MailerService, 
  ) {}

  
  async signUp(data: SellerDTO): Promise<string> {
    

    await this.mailerService.sendMail({
      to: data.email, 
      subject: 'OTP Verification', 
      text: `Your OTP: ${this.Otp}`, 
    });

    
    
    return 'A 6 digit otp has been sent your email';
  }

  async verifyOTP(data: SellerCDTO): Promise<string> {

    const seller =await new SellerEntity();
    let otp=data.otp;
    console.log(' OTP:', otp);
    console.log('Generated OTP:', this.Otp);
    console.log(' OTP:', data.name);
    if (this.Otp === otp) {

      seller.name = data.name;
      seller.email = data.email;
      const salt = await bcrypt.genSalt();
      seller.password = await bcrypt.hash(data.password,salt);
      seller.phoneNumber = data.phoneNumber;
      seller.shopAddress = data.shopAddress;
      seller.shopName = data.shopName;
      seller.shopType = data.shopType;

    await this.sellerRepository.save(seller);

      // const seller =await this.sellerRepository.create(data);
      // await this.sellerRepository.save(seller);
      return 'OTP verification successful';
    } else {
      
      return 'OTP did not matched';
    }
  }
  
  async uploadp(data: profileDTO, shopPhoto: Express.Multer.File): Promise<PhotoEntity> {
    const profile = new PhotoEntity();
    console.log(shopPhoto.filename);
    profile.photoPath = shopPhoto.filename;

    const seller = await this.sellerRepository.findOne({ where: { id: data.profileid } });
    if (!seller) {
      throw new Error('Seller not found');
    }

    profile.profile = seller;

    const savedProfile = await this.photoRepository.save(profile);
    return savedProfile;
  }


   generateOTP(): string {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * digits.length);
      otp += digits[index];
    }

    return otp;
  }



}
