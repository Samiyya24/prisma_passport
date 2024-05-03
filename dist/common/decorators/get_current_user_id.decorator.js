"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserId = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUserId = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user)
        throw new common_1.ForbiddenException("Token noto'g'ri");
    console.log('user', user);
    return user.sub;
});
//# sourceMappingURL=get_current_user_id.decorator.js.map