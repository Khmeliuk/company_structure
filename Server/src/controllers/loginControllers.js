import "dotenv/config";
import User from "../models/user.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 3600, // Час життя cookie в секундах (1 година)
  path: "/", // Cookie буде доступне у всьому додатку
  sameSite: "strict", // Захист від CSRF атак
};

if (process.env.NODE_ENV === "production") {
  cookieOptions.secure = true; // Використовується HTTPS в продакшні
}

export const loginHandler = async function (req, reply) {
  try {

 const user = await User.findOne({ email: req.body.email }).select('+password');
    console.log('====================================');
    console.log(user);
    console.log('====================================');

    if (!user) {
      return reply.code(401).send("invalid login or password");
    }

    const isValid = await user.isValidPassword(req.body.password);

    if (!isValid) {
      return reply.code(401).send("invalid login or password");
    }

    const token = req.server.jwt.sign({
      userId: user._id,
      name: user.name,  
      lastName: user.lastName,
      email: user.email,
    });

    return reply
      .code(201)
      .setCookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 3600, // 1 година
        path: "/",
      })
      .send(user);
  } catch (error) {
    return reply.status(400).send(error.message);
  }
};
export const logoutHandler = async function (req, reply) {
  console.log("====================================");
  console.log("logout");
  console.log("====================================");
  reply
    .clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .send("Logged out successfully");
};

export const registrationHandler = async function (req, reply) {
  try {
    const newUser = req.validatedBody;

    // ✅ Створюємо користувача

    const user = await req.server.mongoose.models.User.create({
      ...newUser,
    });

    // ✅ Логування (видалити в продакшені)
    req.server.log.info({ userId: user.id }, "New user registered");

    // ✅ Генеруємо JWT токен
    const token = req.server.jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      {
        expiresIn: "7d", // Опціонально: термін дії токена
      },
    );

    // ✅ Встановлюємо cookie і відправляємо відповідь
    return reply
      .code(201)
      .setCookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60, // 7 днів (в секундах)
        path: "/",
      })
      .send({
        statusCode: 201,
        message: "User registered successfully",
        user,
      });
  } catch (error) {
    console.log("====================================");
    console.log("Error Cause:", error.cause);
    console.log("====================================");
    if (error.cause?.code === 11000) {
      const duplicatedEmail = error.cause.keyValue?.email || "вказаним";
      return reply.code(400).send({
        status: "fail",
        message: `Користувач із email: "${duplicatedEmail}" вже існує.`,
      });
    }

    req.server.log.error(
      {
        error: error.message,
        stack: error.stack,
      },
      "Registration error",
    );

    // ✅ Загальна помилка
    return reply.code(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Registration failed",
    });
  }
};

export const refreshHandler = async function (req, reply) {
  try {
    const user = await req.jwtVerify();
    reply.status(200).send(user);
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
};
