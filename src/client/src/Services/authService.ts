import {apiClient} from "./api.config.ts";

export class AuthService {
    private static readonly BASE_PATH = "/auth";

    static async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await apiClient.post(this.BASE_PATH + "/login",
                {
                    email, password
                });

            if (response.status == 200) {
                return true;
            }

            return false;

        } catch (error)
        {
            console.error(error);
            return false;
        }
    }
}