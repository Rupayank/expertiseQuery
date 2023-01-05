import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skillExpertiseHandler';

describe.only('Update Expertise Route', () => {
  const userId = '1390266c-ddc8-445d-a1d0-66c5e9e1f759';
  const expertiseId = 'b4d995c5-15e8-4ee4-bf4e-62186e804c34';

  describe('Auth check', () => {
    it('Can only be accessed if the user is signed in', async () => {
      await request(app).put(`/skill/expertise?id=${expertiseId}`).send({}).expect(401);
    });
  });

  describe('Request body check', () => {
    it('Returns an error if an invalid levelOfExperience is provided', async () => {
      await request(app)
        .put(`/skill/expertise?id=${expertiseId}`)
        .set('Cookie', global.signin(userId))
        .send({
          levelOfExperience: 'InvalidExperience',
          yearOfExperience: 1,
        })
        .expect(400);
    });

    it('Returns an error if an invalid yearOfExperience is provided', async () => {
      await request(app)
        .put(`/skill/expertise?id=${expertiseId}`)
        .set('Cookie', global.signin(userId))
        .send({
          levelOfExperience: 'INTERMIDIATE',
          yearOfExperience: -1,
        })
        .expect(400);
    });
  });

  describe('Update expertise check', () => {
    it('Update a skill with valid inputs', async () => {
      const payload = {
        id: expertiseId,
        levelOfExperience: 'INTERMIDIATE',
        yearOfExperience: 1,
      };

      // const isSkillExist = jest
      //   .spyOn(handlers, 'getUserSkillExpertise')
      //   //@ts-ignore
      //   .mockReturnValueOnce(payload);

      const expertise = jest
        .spyOn(handlers, 'updateUserSkillExpertise')
        //@ts-ignore
        .mockReturnValueOnce();

      const response = await request(app)
        .put(`/skill/expertise?id=${expertiseId}`)
        .set('Cookie', global.signin(userId))
        .send(payload)
        .expect(200);

      expect(expertise).toBeCalledWith(payload.id, payload.levelOfExperience, payload.yearOfExperience);
      expect(response.body.message).toEqual('Updated User expertise');
    });
  });
});
