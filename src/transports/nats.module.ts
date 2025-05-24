import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { SERVICES_CONFIG } from 'src/config/services';

@Module({
    imports: [
        ClientsModule.register([
            { ...SERVICES_CONFIG.NATS_SERVICE }
        ])
    ],
    exports: [
        ClientsModule.register([
            { ...SERVICES_CONFIG.NATS_SERVICE }
        ])
    ]
})
export class NatsModule { }
