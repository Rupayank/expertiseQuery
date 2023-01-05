import { Query } from '@prisma/client';
import prisma from '../utils/db';

export const getUserSkillExpertise = async (userId: string): Promise<Query[]> => {
  const skillExpertise = await prisma.query.findMany({ where: { userId } });
  return skillExpertise;
};

export const getAllUserSkillExpertise = async (): Promise<Query[]> => {
  const allSkillExpertise = await prisma.query.findMany({});
  return allSkillExpertise;
};

export const addUserSkillExpertise = async (
  userId: string,
  userName: string,
  userEmail: string,
  domainName: string,
  skillName: string[],
  levelOfExperience: 'BASIC' | 'INTERMIDIATE' | 'ADVANCED',
  yearOfExperience: number,
): Promise<Query> => {
  const skillExpertise = await prisma.query.create({
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

export const updateUserSkillExpertise = async (
  id: string,
  levelOfExperience: 'BASIC' | 'INTERMIDIATE' | 'ADVANCED',
  yearOfExperience: number,
): Promise<Query> => {
  const updateUserSkill = await prisma.query.update({
    where: {
      id,
    },
    data: {
      levelOfExperience,
      yearOfExperience,
    },
  });
  return updateUserSkill;
};
export const deleteUserSkillExpertise = async (id: string) => {
  return prisma.query.delete({ where: { id } });
};
