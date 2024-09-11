import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import RemoveAvatarService from "@modules/users/services/RemoveUserAvatarService";

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(user));
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const deleteUserAvatar = container.resolve(RemoveAvatarService);

    const user = await deleteUserAvatar.execute(request.user.id);

    return response.json(classToClass(user));
  }
}
