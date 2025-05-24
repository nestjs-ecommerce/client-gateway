import "dotenv/config";
import * as joi from "joi";

interface Envs {
    PORT: number;
    NATS_SERVICE: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required().default(3000),
    NATS_SERVICE: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVICE: process.env.NATS_SERVICE ? process.env.NATS_SERVICE.split(",") : [],
}, {
    abortEarly: true,
});

if (error) {
    console.error("Environment variables validation error:", error.details);
    process.exit(1);
}

const envsValidates: Envs = value as Envs;

export const envs = {
    PORT: envsValidates.PORT,
    NATS_SERVICE: envsValidates.NATS_SERVICE,
}