import { injectable } from "tsyringe";
import { User } from "../schemas/User";

interface CreateUserDTO {
  email: string;
  name: string;
  socket_id: string;
  avatar: string;
}

@injectable()
class CreateUserService {
  async execute({ avatar, email, name, socket_id }: CreateUserDTO) {
    const userAlreadyExists = await User.findOne({ email }).exec();

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate({
        _id: userAlreadyExists._id,
      }, {
        $set: { avatar, name, socket_id }
      }, { new: true });

      return user;
    } else {
      const user = await User.create({
        avatar, 
        email,
        name,
        socket_id,
      });

      return user;
    }
  }
}

export { CreateUserService };