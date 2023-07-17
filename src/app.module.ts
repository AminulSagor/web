import { Module } from '@nestjs/common';
import { SellerModule } from './signUp/seller.module';
import { LoginModule } from './logIn/login.module';
import { ProductModule } from './productPosting/product.module';
import { dProductModule } from './deleteProduct/product.module';
import { ViewProductModule } from './viewProduct/viewProduct.module';
import { DeliveryManModule } from './searchDeliveryMan/deliveryMan.module';
import { ForgotPasswordModule } from './forgottenPass/forgotPassword.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    SellerModule,
    LoginModule,
    ProductModule,
    dProductModule,
    ViewProductModule,
    DeliveryManModule,
    ForgotPasswordModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abc45678',
      database: 'tri_gardening',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
