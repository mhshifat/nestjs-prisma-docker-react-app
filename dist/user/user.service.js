"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcryptjs_1 = require("bcryptjs");
const runtime_1 = require("@prisma/client/runtime");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    users() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                created_at: true,
                first_name: true,
                last_name: true,
                email: true,
            }
        });
    }
    async create(dto) {
        try {
            const hashPassword = await bcryptjs_1.default.hash(dto.password, 10);
            const doc = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, dto), { password: hashPassword })
            });
            delete doc.password;
            return doc;
        }
        catch (err) {
            if (err instanceof runtime_1.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new common_1.ForbiddenException("Credential taken");
                }
            }
            throw err;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map