import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skillExpertiseHandler';

describe('Get Expertise Route', () => {
  const userId = 'efgh456';
  describe('Auth check', () => {
    it('Can only be accessed if the user is signed in', async () => {
      await request(app).get('/skill/expertise').expect(401);
    });
  });

  describe('Get expertise check', () => {
    it('Can fetch a list of all expertise', async () => {
      const payload = [
        {
          id: '7b6911f4-8b45-4919-a011-7b8947343589',
          userId: 'efgh456',
          createdAt: '2022-12-27T20:21:24.286Z',
          updatedAt: '2023-01-03T06:38:14.076Z',
          skillId: '999',
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: 2,
        },
        {
          id: '18bd7ba3-3080-44f4-881a-26b9b595c847',
          userId: 'abcd123',
          createdAt: '2023-01-03T06:26:00.176Z',
          updatedAt: '2023-01-03T06:45:22.605Z',
          skillId: '112233',
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: 2,
        },
      ];

      const allExpertise = jest
        .spyOn(handlers, 'getAllUserSkillExpertise')
        //@ts-ignore
        .mockReturnValueOnce(payload);

      const response = await request(app).get('/skill/expertise/all').set('Cookie', global.signin(userId));

      expect(response.status).not.toEqual(401);
      expect(allExpertise).toBeCalledWith();
      expect(response.body.response).toEqual(payload);
    });
    it('Can fetch a list of expertise for a particular userId', async () => {
      const payload = [
        {
          id: '7b6911f4-8b45-4919-a011-7b8947343589',
          userId: 'efgh456',
          skillId: '999',
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: 2,
        },
        {
          id: '18bd7ba3-3080-44f4-881a-26b9b595c847',
          userId: 'abcd123',
          skillId: '112233',
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: 2,
        },
      ];

      const userExpertise = jest
        .spyOn(handlers, 'getUserSkillExpertise')
        //@ts-ignore
        .mockReturnValueOnce(payload[0]);

      const response = await request(app).get('/skill/expertise').set('Cookie', global.signin(userId));

      expect(response.status).not.toEqual(401);
      expect(userExpertise).toBeCalledWith(userId);
      expect(response.body.response).toEqual(payload[0]);
    });
  });
});
