import { ExpertiseQuery } from '@prisma/client';
import { Request, Response } from 'express';
import {
  getDomains,
  getUserSkillExpertise,
  getAllUserSkillExpertise,
  addUserSkillExpertise,
} from '../handlers/skillExpertiseHandler';

async function getUniqueDomains(req: Request, res: Response) {
  try {
    await getDomains().then((domain) => {
      const domainArr = [];
      domain.forEach((ele) => {
        domainArr.push(ele.domainName);
      });
      res.status(200).send({ message: 'Unique domains', response: domainArr });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

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
    let skills: string[];
    if (req.query.skill) {
      skills = (req.query.skill as string).toLowerCase().split(',');
      console.log(skills);
    }
    const experience = req.query.experience as string;
    const years = req.query.years as string;
    await getAllUserSkillExpertise().then((expertise) => {
      let data: Array<ExpertiseQuery> = expertise;
      if (domain) {
        data = data.filter((ele) => ele.domainName === domain);
      }
      if (skills) {
        data = data.filter((ele) => JSON.stringify(ele.skillName) === JSON.stringify(skills));
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
    {
    }
  }
}

export { getUniqueDomains, getUserExpertise, getAllExpertise, addExpertise };
