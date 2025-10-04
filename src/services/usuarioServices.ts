import { Usuario, IUsuario } from '../models/usuario';

export class UserService {
    async createUser(user: Partial<IUsuario>): Promise<IUsuario | null> {
        try {
          const newUser = new Usuario(user);
          return await newUser.save();
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }
      
    async getAllUsers(): Promise<IUsuario[] | null> {
      return await Usuario.find();
    }

    async getUserById(id: string): Promise<IUsuario | null> {
      return await Usuario.findById(id);
    }

    async getUserByUsername(username: string): Promise<IUsuario | null> {
      return await Usuario.findOne({ username });
    }

    async updateUserById(id: string, user: Partial<IUsuario>): Promise<IUsuario | null> {
      return await Usuario.findByIdAndUpdate(id, user, { new: true });
    }

    async updateUserByUsername(username: string, user: Partial<IUsuario>): Promise<IUsuario | null> {
        return await Usuario.findOneAndUpdate({ username }, user, { new: true });
    }

    async deleteUserById(id: string): Promise<IUsuario | null> {
      return await Usuario.findByIdAndDelete(id);
    }

    async deleteUserByUsername(username: string): Promise<IUsuario | null> {
        return await Usuario.findOneAndDelete({ username });
    }

/* Login */
    async loginUser(username: string, password: string): Promise<IUsuario | null> {
        try {
            const user = await Usuario.findOne({ username });
            if (!user) {
                return null;
            }
            
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return null;
            }
            
            return user;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /* Create default admin user  */ 
    async createAdminUser(): Promise<void> {
        try {
            const adminExists = await Usuario.findOne({ username: 'admin' });
            if (!adminExists) {
                const adminUser = new Usuario({
                    username: 'admin',
                    gmail: 'admin@example.com',
                    password: 'admin',
                    birthday: new Date('2000-01-01')
                });
                await adminUser.save();
                console.log('Usuario admin creado exitosamente');
            }
        } catch (error) {
            console.error('Error creando usuario admin:', error);
        }
    }
  }