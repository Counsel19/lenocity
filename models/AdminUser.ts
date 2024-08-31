import mongoose from "mongoose";
import { SignJWT } from "jose";

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: String,
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

// // Hash the password before saving
// adminUserSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

adminUserSchema.methods.createJWT = async function () {
  const jwt = await new SignJWT({ userId: this._id, role: this.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_LIFETIME as string)
    .sign(secret);

  return jwt;
};

// Check if the model is already compiled
const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
