"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const start = async () => {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const PORT = process.env.PORT || 3333;
        app.use(cookieParser());
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=main.js.map