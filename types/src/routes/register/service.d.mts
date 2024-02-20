export function postRegisterHandler(req: any, res: any): Promise<{
    message: string;
    error?: undefined;
    token?: undefined;
} | {
    error: string;
    message?: undefined;
    token?: undefined;
} | {
    token: any;
    message?: undefined;
    error?: undefined;
}>;
//# sourceMappingURL=service.d.mts.map