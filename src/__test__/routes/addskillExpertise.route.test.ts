import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skillExpertiseHandler';
import { json } from 'stream/consumers';

describe('Add Skill Expertise Route', () => {
  const userId = '1f43c4ce-a942-48fb-9ac2-4a5c6b3f81c4';
  describe('Auth check', () => {
    it('Can only be accessed if the user is signed in', async () => {
      await request(app).post('/query').send({}).expect(401);
    });

    it('Returns a status other than 401 if the user is signed in', async () => {
      const response = await request(app).post('/query').set('Cookie', global.signin(userId)).send({});

      expect(response.status).not.toEqual(401);
    });
  });

  describe('Request body check', () => {
    it('Returns an error if an invalid email is provided', async () => {
      await request(app)
        .post('/query')
        .set('Cookie', global.signin(userId))
        .send({
          userName: 'KKR',
          userEmail: 'abcd123',
          domainName: 'HR',
          skillName: ['Reliability'],
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: 1,
        })
        .expect(400);
    });

    it('Returns an error if an invalid levelOfExperience is provided', async () => {
      await request(app)
        .post('/query')
        .set('Cookie', global.signin(userId))
        .send({
          userName: 'KKR',
          userEmail: 'abcd123',
          domainName: 'HR',
          skillName: ['Reliability'],
          levelOfExperience: 'InvalidExperience',
          yearOfExperience: 1,
        })
        .expect(400);
    });

    it('Returns an error if an invalid yearOfExperience is provided', async () => {
      await request(app)
        .post('/query')
        .set('Cookie', global.signin(userId))
        .send({
          levelOfExperience: 'INTERMIDIATE',
          skillId: 'TestSkill123',
          yearOfExperience: -1,
        })
        .expect(400);
    });
  });

  describe('Add expertise check', () => {
    it('Adds a skill expertise with valid inputs', async () => {
      const payload = {
        id: '63810918-a966-4f31-bdd6-f873c7a8ad86',
        userId: userId,
        userName: 'KKR',
        userEmail: 'abcd123@gmail.com',
        domainName: 'HR',
        skillName: ['Reliability'],
        levelOfExperience: 'INTERMIDIATE',
        yearOfExperience: 1,
      };
      const skillExpertise = jest
        .spyOn(handlers, 'addUserSkillExpertise')
        //@ts-ignore
        .mockReturnValueOnce(payload);

      const response = await request(app)
        .post('/query')
        .set('Cookie', global.signin(userId))
        .send({
          userName: 'KKR',
          userEmail: 'abcd123@gmail.com',
          domainName: 'HR',
          skillName: ['Reliability'],
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: 1,
        })
        .expect(201);

      expect(response.body.response).toEqual(payload);
    });
  });
});
