"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    console.log(data);
    console.log(request.user);
    if (!data)
        return request.user;
    return request.user[data];
});
//# sourceMappingURL=get_current_user.decorator.js.map