import express, { Request, Response, Router } from "express";
import { AuthUserController } from "../modules/auth/controllers/auth.user.controller";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { UserLoginDto } from "../modules/auth/dtos/user.login.dto";
import { asyncHandler } from "../utils/async.handler";
import { ValidationException } from "../common/exceptions/validation.exception";
import { HttpStatusCode } from "../common/constants/http.status.code.constant";
import { UserController } from "../modules/users/controllers/user.controller";
import { UserProtectedGuard } from "../common/request/guards/authenticated.user";
import { REQUEST_META } from "../common/request/constants/request.constant";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { RequestQueryValidator } from "../common/request/validator/request.query.validator";
import { RequestListQueryDto } from "../common/request/dtos/query/request.list.query.dto";
import { RESPONSE_META } from "../common/response/constants/response.constant";

export function userRouterFactory(): Router {
  const userRouter: Router = express.Router();

  // Auth ********************************************* Auth \\
  const authUserController: AuthUserController = new AuthUserController();

  userRouter.post(
    "/auth/login",
    RequestBodyValidation(UserLoginDto),
    asyncHandler(async (req: Request, res: Response) => {
      const { email, userName } = req.body;
      if (!email && !userName) {
        throw new ValidationException(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          "At least one email or username is required."
        );
      }
      const data = await authUserController.login(req.body);
      res.json(data);
    })
  );

  const userController: UserController = new UserController();

  // User ********************************************* User \\

  userRouter.post(
    "/register",
    RequestBodyValidation(UserCreateDto),
    asyncHandler(async (req: Request, res: Response) => {
      const incomingData = req.body;
      const createdData = await userController.create(incomingData);
      res.json(createdData);
    })
  );

  userRouter.get(
    "/auth-me",
    UserProtectedGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const protectedUserId = Number(req[REQUEST_META.PROTECTED_USER]);
      const data = await userController.getById(protectedUserId);
      res.json(data);
    })
  );
  //get user
  userRouter.get(
    "/list",
    RequestQueryValidator(RequestListQueryDto),
    asyncHandler(async (req: Request, res: Response) => {
      const data = await userController.getAll(req.query);
      res[RESPONSE_META.RESPONSE_MESSAGE] = "Get List Successfully";
      res.json(data);
    })
  );

  userRouter.get(
    "/info/:id",
    asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = await userController.getById(Number(id));
      res.json(data);
    })
  );

  return userRouter;
}
