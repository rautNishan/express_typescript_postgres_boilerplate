export function UserRegisterDoc() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      /**
       * @swagger
       * /user/register:
       *   post:
       *     tags:
       *       - User
       *     summary: User Register
       *     description: Allows users to Register.
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             required:
       *               - userName
       *               - email
       *               - password
       *             properties:
       *               email:
       *                 type: string
       *                 format: email
       *                 description: User's email
       *               userName:
       *                 type: string
       *                 description: User's username
       *               password:
       *                 type: string
       *                 description: User's password
       *                 minLength: 1
       *     responses:
       *       200:
       *         description: Successfully Registered.
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 token:
       *                   type: string
       *                   description: JWT token for accessing protected routes
       *                 user:
       *                   type: object
       *                   properties:
       *                     id:
       *                       type: integer
       *                       description: User's ID
       *                     email:
       *                       type: string
       *                       format: email
       *                       description: User's email
       *                     userName:
       *                       type: string
       *                       description: User's username
       *       422:
       *         description: Validation error - Password is required
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message indicating the missing fields
       *       500:
       *         description: Server error
       */

      const result = originalMethod.apply(this, args);
      return result;
    };
  };
}

export function UserListDoc() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      /**
       * @swagger
       * /user/list:
       *   get:
       *     tags:
       *       - User
       *     summary: User List
       *     description: Allows to Fetch User List.
       *     responses:
       *       200:
       *         description: Successfully Registered.
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 token:
       *                   type: string
       *                   description: JWT token for accessing protected routes
       *                 user:
       *                   type: object
       *                   properties:
       *                     id:
       *                       type: integer
       *                       description: User's ID
       *                     email:
       *                       type: string
       *                       format: email
       *                       description: User's email
       *                     userName:
       *                       type: string
       *                       description: User's username
       *       422:
       *         description: Validation error - Password is required
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message indicating the missing fields
       *       500:
       *         description: Server error
       */

      const result = originalMethod.apply(this, args);
      return result;
    };
  };
}
