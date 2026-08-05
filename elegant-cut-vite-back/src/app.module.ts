import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BarbersModule } from './modules/barbers/barbers.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ServicesModule } from './modules/services/services.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { PqrsModule } from './modules/pqrs/pqrs.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';
import { PortabarberoModule } from './modules/portabarbero/portabarbero.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile:
        process.env.NODE_ENV === 'production' || !!process.env.DATABASE_URL,
    }),
    // Caché en Memoria (In-Memory Cache) configurado globalmente
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // 60 segundos (los datos cacheados expiran en 1 minuto)
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BarbersModule,
    AppointmentsModule,
    ServicesModule,
    ReviewsModule,
    PqrsModule,
    DashboardModule,
    EmailModule,
    PortabarberoModule,
    UploadsModule,

    NotificationsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
