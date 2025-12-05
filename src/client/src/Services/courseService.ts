import {apiClient} from "./api.config.ts";


import type {Course} from "../Types/Course.ts";

export class CourseService {
    private static readonly BASE_PATH = "/courses";

    static async getAllCourses(): Promise<Course[]> {
        try {
            const res = await apiClient.get<Course[]>(this.BASE_PATH);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    static async getCourseByUuid(uuid: string) {
        try {
            const res = await apiClient.get<Course[]>(`${this.BASE_PATH}/${uuid}`);

            return res.data;
        } catch (error) {
            throw error;
        }
    }
}