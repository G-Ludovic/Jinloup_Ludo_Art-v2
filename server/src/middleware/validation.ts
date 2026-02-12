import type { NextFunction, Request, Response } from "express";

// Validation rules for different resources
export const validationRules = {
  // User registration
  user: {
    email: (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    password: (password: string) => {
      return password.length >= 8;
    },
    confirmPassword: (password: string, confirmPassword: string) => {
      return password === confirmPassword;
    },
  },

  // Draw
  draw: {
    name: (name: string) => {
      return name.trim().length > 0 && name.trim().length <= 100;
    },
  },

  // Message
  message: {
    content: (content: string) => {
      return content.trim().length > 0 && content.trim().length <= 1000;
    },
  },

  // Subject
  subject: {
    title: (title: string) => {
      return title.trim().length > 0 && title.trim().length <= 100;
    },
  },
};

// Generic validation middleware
export const validate = (
  rules: Record<string, (value: unknown) => boolean>,
  fieldNames: string[],
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string> = {};

    for (const fieldName of fieldNames) {
      const value = req.body[fieldName];
      if (!rules[fieldName](value)) {
        errors[fieldName] = `Invalid value for ${fieldName}`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
};

// Custom validation function
export const validateField = (
  value: unknown,
  validator: (value: unknown) => boolean,
  fieldName: string,
): { isValid: boolean; error?: string } => {
  if (!validator(value)) {
    return { isValid: false, error: `Invalid value for ${fieldName}` };
  }
  return { isValid: true };
};
