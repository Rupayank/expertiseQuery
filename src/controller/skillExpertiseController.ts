import { BadRequestError } from '@hackathonskilldb/common-middlewares';
import { Query } from '@prisma/client';
import { Request, Response } from 'express';
import {
  getUserSkillExpertise,
  getAllUserSkillExpertise,
  addUserSkillExpertise,
  updateUserSkillExpertise,
  deleteUserSkillExpertise,
} from '../handlers/skillExpertiseHandler';
async function getUserExpertise(req: Request, res: Response) {
  try {
    const expertise = await getUserSkillExpertise(req.currentUser.id);
    res.status(200).send({ message: 'User expertise', response: expertise });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function getAllExpertise(req: Request, res: Response) {
  try {
    const domain = req.query.domain as string;
    const skill = req.query.skill as string;
    const experience = req.query.experience as string;
    const years = req.query.years as string;
    await getAllUserSkillExpertise().then((expertise) => {
      let data: Array<Query> = expertise;
      if (domain) {
        data = data.filter((ele) => ele.domainName === domain.toUpperCase());
      }
      if (experience) {
        data = data.filter((ele) => ele.levelOfExperience === experience.toUpperCase());
      }
      if (years) {
        data = data.filter((ele) => ele.yearOfExperience === parseInt(years));
      }
      res.status(200).send({ response: data });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function addExpertise(req: Request, res: Response) {
  try {
    // const Uid = req.currentUser.id;
    const { userId, userName, userEmail, domainName, skillName, levelOfExperience, yearOfExperience } = req.body;
    const expertise = await addUserSkillExpertise(
      userId,
      userName,
      userEmail,
      domainName,
      skillName,
      levelOfExperience,
      yearOfExperience,
    );
    res.status(201).send({ message: 'Added User expertise', response: expertise });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function updateExpertise(req: Request, res: Response) {
  const id = req.query.id as string;
  if (!id) {
    throw new BadRequestError('Id should be prsent');
  }
  const expertiseExists = await getUserSkillExpertise(id);
  if (!expertiseExists) {
    throw new BadRequestError('Expertise does not exist');
  }
  try {
    const { levelOfExperience, yearOfExperience } = req.body;
    const expertise = await updateUserSkillExpertise(id, levelOfExperience, yearOfExperience);
    res.status(200).send({ message: 'Updated User expertise', response: expertise });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function deleteExpertise(req: Request, res: Response) {
  const id = req.query.id as string;
  if (!id) {
    throw new BadRequestError('Id should be prsent');
  }
  const expertiseExists = await getUserSkillExpertise(id);
  if (!expertiseExists) {
    throw new BadRequestError('Expertise does not exist');
  }
  try {
    const deleteExpertise = await deleteUserSkillExpertise(id);
    res.status(200).send({ message: 'Deleted User Expertise', response: deleteExpertise });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export { getUserExpertise, getAllExpertise, addExpertise, updateExpertise, deleteExpertise };
