import { container } from "tsyringe";
import { io } from "../http";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateUserService } from "../services/CreateUserService";
import { GetAllUsersService } from "../services/GetAllUsersService";
import { GetChatRoomByUsersService } from "../services/GetChatRoomByUsersService";
import { GetUserBySocketIdService } from "../services/GetUserBySocketIdService";

io.on('connect', socket => {
  
  socket.on('start', async data => {
    const { email, avatar, name } = data;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ avatar, email, name, socket_id: socket.id });

    socket.broadcast.emit('new_users', user);
  });

  socket.on('get_users', async (callback) => {    
    const getAllUsersService = container.resolve(GetAllUsersService);

    const users = await getAllUsersService.execute();

    callback(users);
  });

  socket.on('start_chat', async (data, callback) => {    
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
    const getChatRoomByUsersService = container.resolve(GetChatRoomByUsersService);    

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    let chatRoom = await getChatRoomByUsersService.execute([ userLogged._id, data.idUser ]);

    if (!chatRoom) {
      chatRoom = await createChatRoomService.execute([ userLogged._id, data.idUser ]);
    }

    console.log(chatRoom);

    callback(chatRoom);
  });
});