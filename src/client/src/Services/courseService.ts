import {apiClient} from "./api.config.ts";

import type {Course} from "../Types/Course.ts";
import type {AddModuleRequest} from "../Models/Requests/AddModuleRequest.ts";

export class CourseService {
    private static readonly BASE_PATH = "/courses";

    static async getAllCourses(): Promise<Course[]> {
        try {
            const res = await apiClient.get<Course[]>(this.BASE_PATH);
            return res.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getCourseByUuid(uuid: string) {
        try {
            const res = await apiClient.get<Course>(`${this.BASE_PATH}/${uuid}`);

            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createModule(request: AddModuleRequest): Promise<string | null> {
        try {
            const res = await apiClient.post(`${this.BASE_PATH}/modules`, request);

            return res.data;

        } catch (error) {
            console.error(error);
        } finally {
            return null;
        }
    }
}