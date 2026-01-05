import { Router } from "express";
import auth from "../../utils/auth";
import { Role } from "../../utils/roles";

const router = Router();

// Route accessible à tout utilisateur connecté
router.get("/profile", auth.verifyToken, (req, res) => {
  res.status(200).json({
    message: `Bienvenue, ${req.user?.email} !`,
    role: req.user?.role,
  });
});

// Route réservée aux modérateurs (Gardiens) et admins (Alphas)
router.get(
  "/moderator-zone",
  auth.verifyToken,
  auth.authorize([Role.GARDIEN, Role.ALPHA]),
  (req, res) => {
    res.status(200).json({
      message: `Zone réservée aux modérateurs et admins. Accès accordé à ${req.user?.email}.`,
    });
  },
);

// Route réservée uniquement à l’admin (Alpha)
router.get(
  "/admin-zone",
  auth.verifyToken,
  auth.authorize([Role.ALPHA]),
  (req, res) => {
    res.status(200).json({
      message: `Bienvenue dans la tanière secrète, ${req.user?.email} (Alpha) 🐺`,
    });
  },
);

export default router;
