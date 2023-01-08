import { ExpertiseQuery, LEVEL_OF_EXPERIENCE } from '@prisma/client';
import Domains from '../interface/expertise';
import prisma from '../utils/db';

export const getDomains = async (): Promise<Domains[]> => {
  const skillExpertise = await prisma.expertiseQuery.findMany({
    distinct: ['domainName'],
    select: {
      domainName: true,
    },
  });
  return skillExpertise;
};

export const getAllUserSkillExpertise = async (): Promise<ExpertiseQuery[]> => {
  const allSkillExpertise = await prisma.expertiseQuery.findMany({});
  return allSkillExpertise;
};

export const addUserSkillExpertise = async (
  userId: string,
  userName: string,
  userEmail: string,
  domainName: string,
  skillName: string[],
  levelOfExperience: LEVEL_OF_EXPERIENCE,
  yearOfExperience: number,
): Promise<ExpertiseQuery> => {
  const skillExpertise = await prisma.expertiseQuery.create({
    data: {
      userId,
      userName,
      userEmail,
      domainName,
      skillName,
      levelOfExperience,
      yearOfExperience,
    },
  });
  return skillExpertise;
};
