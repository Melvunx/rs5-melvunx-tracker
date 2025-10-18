import z from "zod";

export const ChallengeSchema = z.object({
  id: z.string(),
  challengeName: z.string(),
  shotsHit: z.number().min(0),
  kills: z.number().min(0),
  weapon: z.string(),
  accuracy: z.number().min(0).max(100),
  damage: z.number().min(0),
  criticalShots: z.number().min(0),
  totalShots: z.number().min(0),
  roundtime: z.number().min(0), // in seconds
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const CreateChallengeSchema = ChallengeSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateChallenge = z.infer<typeof CreateChallengeSchema>;
