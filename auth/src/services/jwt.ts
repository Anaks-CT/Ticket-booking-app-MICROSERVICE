import jwt from "jsonwebtoken";

export class JwtManager {
  // Generate token
  static signToken(id: string, email: string) {
    const userjwt = jwt.sign(
      {
        id,
        email,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: 3600 }
    );
    return userjwt;
  }
}
