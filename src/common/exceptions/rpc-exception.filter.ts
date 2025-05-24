import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost){
        const ctx = host.switchToRpc();
        const response = ctx.getContext();

        const rpcError = exception.getError();

        if (
            typeof rpcError === 'object' &&
            'code' in rpcError &&
            'message' in rpcError
        ) {
            const status = rpcError.code;
            return response.status(status).json(rpcError);
        }

        return response.status(400).json({
            code: 400,
            message: rpcError,
        });
    }
}
