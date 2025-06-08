import { EmailValidator } from "@angular/forms"

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
    job_Responsibilities: string,
    job_location: string,
    job_min_salary: number | string,
    job_max_salary: number | string,
    job_status: string,
    Recruitment_start_Period: Date|string,
    Recruitment_end_Period: Date|string,
    post_app:string,
    quota:number|string,
    job_created_at: Date|string,
    job_updated_at: Date|string,
}
export interface Login{
    email: string
    password: string
}

export interface hr_department{

    department: string,
    data: {
        department:string
        title:string
        position:string
        experience:string
        type:string
        education:string
        loction:string
        description:string
        minsalary:string
        maxsalary:string
        status: string
        skill: [
          string
        ]
    }
}


