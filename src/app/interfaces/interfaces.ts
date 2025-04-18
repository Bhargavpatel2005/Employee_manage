// export interface Job {
//     id: number;
//     job_title: string;
//     job_department: string;
//     job_position: string;
//     job_experience: string;
//     job_type: string;
//     job_education: string;
//     job_skills: string;
//     job_description: string;
//     job_location: string;
//     job_salary:{
//         min_salary: string;
//         max_salary: string;
//     };
//     job_status: string;
//     job_created_at: Date;
// }
export interface Job{
    id: number,
    job_title: string,
    job_department: string,
    job_position: string,
    job_experience: string,
    job_type: string,
    job_education: string,
    job_skills: string,
    job_description: string,
    job_location: string,
    job_min_salary: number,
    job_max_salary: number
    job_status: string,
    job_created_at: Date
}