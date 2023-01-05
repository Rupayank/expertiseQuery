import request from 'supertest';
import app from '../../server';
import * as handlers from '../../handlers/skillExpertiseHandler';

describe('Delete Skill Route', () => {
  const userId = '1390266c-ddc8-445d-a1d0-66c5e9e1f759';
  const expertiseId = 'b4d995c5-15e8-4ee4-bf4e-62186e804c34';
  describe('Auth check', () => {
    it('can only be accessed if the user is signed in', async () => {
      await request(app).delete(`/skill/expertise?id=${expertiseId}`).send({}).expect(401);
    });
  });

  describe('Delete expertise check', () => {
    it('Delete expertise with valid id', async () => {
      const payload = {
        id: expertiseId,
      };

      const isExpertiseExist = jest
        .spyOn(handlers, 'getUserSkillExpertise')
        //@ts-ignore
        .mockReturnValueOnce(payload);

      const expertise = jest
        .spyOn(handlers, 'deleteUserSkillExpertise')
        //@ts-ignore
        .mockReturnValueOnce(payload);

      const response = await request(app)
        .delete(`/skill/expertise?id=${expertiseId}`)
        .set('Cookie', global.signin(userId))
        .expect(200);

      expect(isExpertiseExist).toBeCalledWith(expertiseId);
      expect(expertise).toBeCalledWith(expertiseId);
      expect(response.body.response).toEqual(payload);
    });
  });
});
