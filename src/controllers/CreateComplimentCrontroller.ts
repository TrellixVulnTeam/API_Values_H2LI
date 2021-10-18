import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentsController {
  async handle(req: Request, res: Response) {
    const { tag_id, user_sender, user_receiver, message } = req.body;

    const createComplimentsService = new CreateComplimentService();

    const compliment = await createComplimentsService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return res.json(compliment);
  }
}

export { CreateComplimentsController };
