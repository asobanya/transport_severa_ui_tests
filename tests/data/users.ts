export interface UserCredentials {
  name: string;
  surname: string;
  email: string;
  password: string;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Не задана переменная окружения ${name}`);
  }

  return value;
}

export const USERS: Record<"user1" | "user2", UserCredentials> = {
  user1: {
    name: "Иван",
    surname: "Иванов",
    email: getRequiredEnv("USER1_EMAIL"),
    password: getRequiredEnv("USER1_PASSWORD"),
  },

  user2: {
    name: "Петр",
    surname: "Петров",
    email: getRequiredEnv("USER2_EMAIL"),
    password: getRequiredEnv("USER2_PASSWORD"),
  },
};

export const AUTH_STORAGE_PATHS = {
  user1: "setup/.auth/user1.json",
  user2: "setup/.auth/user2.json",
} as const;
