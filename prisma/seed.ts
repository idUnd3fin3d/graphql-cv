import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

interface DataJson {
  profile: {
    name: string;
    description: string;
    githubLink?: string;
    hhLink?: string;
  }
  experience: {
    company: string;
    position: string;
    description?: string;
    startDate: number;
    endDate: number;
  }[];
  skills: {
    name: string;
  }[];
  projects: {
    name: string;
    url?: string;
  }[];
}

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  if (!process.env.SEED_INITIAL_DATA_JSON || !await prisma.profile.count()) {
    const { profile, experience, skills, projects }: DataJson = JSON.parse(process.env.SEED_INITIAL_DATA_JSON!);

    await prisma.profile.create({
        data: {
        ...profile,
        experience: { create: experience.map(({ startDate, endDate, ...exp }) => ({ ...exp, startDate: new Date(startDate), endDate: new Date(endDate) })) },
        skills: { create: skills },
        projects: { create: projects }
        }
    });
  };
}

main()
  .then(async () => {
    console.log('Initial data filled');
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });