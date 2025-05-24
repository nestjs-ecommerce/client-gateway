import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { envs } from "./envs";

export const SERVICES_CONFIG: Record<string, ClientProviderOptions> = {
  NATS_SERVICE: {
    name: 'NATS_SERVICE',
    transport: Transport.NATS,
    options: {
      servers: envs.NATS_SERVICE,
    },
  },
};